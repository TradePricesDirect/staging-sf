import _ from "lodash";
import { getAuthToken } from "@saleor/sdk";
import useSWR, { useSWRConfig } from "swr";
import rangeConfig from "core/kitchen-ranges";

const fetcher = (token) => async (url) => {
  const res = await fetch(window.location.origin + url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`,
    },
  });

  return res.json();
};

export const useWishlists = () => {
  const { mutate } = useSWRConfig();

  const token = getAuthToken();

  // Fetch wishlist info
  const { data: wishlists, error } = useSWR(
    token ? `/api/wishlists` : { data: [], error: null },
    fetcher(token)
  );

  const addItem = async (wishlistId, products) => {
    mutate(
      "/api/wishlists",
      wishlists.map((wishlist) => {
        return wishlist.id === wishlistId
          ? {
              ...wishlist,
              lines: [...wishlist.lines, ...products],
            }
          : wishlist;
      }),
      false
    );

    await updateWishlist(wishlistId, { method: "add", products });

    mutate("/api/wishlists");
    mutate(`/api/wishlists/${wishlistId}`);
  };

  const removeItem = async (wishlistId, products) => {
    const localData = wishlists.map((wishlist) =>
      wishlist.id === wishlistId
        ? {
            ...wishlist,
            lines: wishlist.lines.filter((line) => {
              const match = products.find(
                ({ product_id, variant_id }) =>
                  product_id === line.product_id &&
                  variant_id === line.variant_id
              );

              return !match;
            }),
          }
        : wishlist
    );

    mutate("/api/wishlists", localData, false);

    mutate(
      `/api/wishlists/${wishlistId}`,
      _.find(localData, ["id", wishlistId]),
      false
    );

    await updateWishlist(wishlistId, { method: "remove", products });

    mutate("/api/wishlists");
    mutate(`/api/wishlists/${wishlistId}`);
  };

  return {
    wishlists: wishlists,
    loading: !error && !wishlists,
    error: error,
    addItem,
    removeItem,
  };
};

export const useWishlistsByUser = (userId) => {
  const token = getAuthToken();

  // Fetch wishlist info
  const { data: wishlists, error } = useSWR(
    `/api/wishlists?userId=${userId}`,
    fetcher(token)
  );

  return {
    wishlists: wishlists,
    loading: !error && !wishlists,
    error: error,
  };
};

export const useWishlist = (id) => {
  const token = getAuthToken();

  // Fetch wishlist info
  const { data, error } = useSWR(`/api/wishlists/${id}`, fetcher(token));

  return {
    wishlist: data,
    loading: !error && !data,
    error: error,
  };
};

export const createWishlist = async (data) => {
  const token = getAuthToken();

  try {
    const res = await fetch(`${window.location.origin}/api/wishlists`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw res;

    return await res.json();
  } catch (error) {
    console.error(error);
    location.reload();
  }
};

export const deleteWishlist = async (id) => {
  const token = getAuthToken();

  try {
    const res = await fetch(`${window.location.origin}/api/wishlists/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
    });

    if (!res.ok) throw res;

    return await res.json();
  } catch (error) {
    console.error(error);
    location.reload();
  }
};

export const updateWishlist = async (id, data) => {
  const token = getAuthToken();

  let endpoint = `${window.location.origin}/api/wishlists/${id}`;

  if (data?.products) endpoint += "/products";

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify({ ...data }),
    });

    if (!res.ok) throw res;

    return await res.json();
  } catch (error) {
    console.error(error);
    location.reload();
  }
};

export const groupWishlistItems = (lines) => {
  if (!lines) return { items: [], ranges: [] };

  let { ranges = [], items = [] } = _.groupBy(lines, (line) =>
    line.product.productType.slug === "kitchen-range-component"
      ? "ranges"
      : "items"
  );

  ranges = groupWishlistItemsByKitchenRanges(ranges);

  return { items, ranges };
};

const groupWishlistItemsByKitchenRanges = (items) => {
  return items.reduce((acc, item) => {
    const collections = item.product.collections;
    const attributes = item.variant.attributes;

    const door = getAttributeValues(attributes, "door-colour")[0];
    let cabinets = getAttributeValues(attributes, "cabinet-colour");
    cabinets = _.filter(cabinets, (c) => c.slug !== "all");

    collections.forEach((range) => {
      const index = _.findIndex(acc, { slug: range.slug, door });

      if (index > -1) {
        acc[index].cabinets = _.uniqBy(
          [...acc[index].cabinets, ...cabinets],
          "slug"
        );

        acc[index].items = _.sortBy(
          [...acc[index].items, item],
          ["variant.product.name"]
        );
      } else {
        acc.push({
          ...range,
          door: door,
          cabinets: cabinets,
          thumbnail: {
            url: getKitchenRangeThumbnail(range.slug, door.slug),
            alt: range.name,
          },
          items: [item],
        });
      }
    });

    return acc;
  }, []);
};

const getKitchenRangeThumbnail = (slug, color) => {
  if (!rangeConfig.hasOwnProperty(slug)) return null;

  const { images } = rangeConfig[slug];

  const image = images.find((image) => image.includes(color));

  return image || images[0];
};

const getAttributeValues = (attributes, slug) => {
  const attribute = attributes.find((a) => a.attribute.slug === slug);

  return attribute?.values || [];
};
