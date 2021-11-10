import _ from "lodash";
import config from "core/kitchen-ranges";

export const groupCartItems = (cartItems) => {
  if (!cartItems) return { items: [], ranges: [] };

  let { ranges = [], items = [] } = _.groupBy(cartItems, (item) =>
    item?.variant?.product?.productType?.slug === "kitchen-range-component"
      ? "ranges"
      : "items"
  );

  ranges = groupCartItemsByKitchenRanges(ranges);

  return {
    items,
    ranges,
  };
};

const groupCartItemsByKitchenRanges = (items) => {
  return items.reduce((acc, item) => {
    const collections = item.variant.product.collections;
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
  if (!config.hasOwnProperty(slug)) return null;

  const { images } = config[slug];

  const image = images.find((image) => image.includes(color));

  return image || images[0];
};

const getAttributeValues = (attributes, slug) => {
  const attribute = attributes.find((a) => a.attribute.slug === slug);

  return attribute?.values || [];
};
