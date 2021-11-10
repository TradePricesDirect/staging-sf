import { SaleorManager, VariantAttributeScope } from "@saleor/sdk";
import { getShop } from "@saleor/sdk/lib/queries/shop";
import { apiUrl, channelSlug } from "core/constants";
import kitchenRangeConfig from "core/kitchen-ranges";
import {
  shopAttributesQuery,
  categoryLevelsQuery,
  shopMenusQuery,
  shopFooterMenusQuery,
  productDetailsQuery,
  orderDetailsByTokenQuery,
  pagesQuery,
  pageDetailsQuery,
  kitchenRangesQuery,
  kitchenRangeDetailsQuery,
  kitchenRangeComponentsQuery,
} from "graphql/queries";
import { formatKitchenRangeData } from "utils/kitchen-ranges";

let CONNECTION = null;

export const getSaleorApi = async () => {
  if (!CONNECTION) {
    const manager = new SaleorManager(
      { apiUrl, channel: channelSlug },
      { options: { ssrMode: true } }
    );

    CONNECTION = await manager.connect();
  }

  return CONNECTION;
};

export const exhaustList = async (listApi, tries) => {
  return new Promise((resolve, reject) => {
    (async function fetch(listApi, triesLeft) {
      const result = await listApi;

      const { pageInfo, next } = result;

      if (pageInfo?.hasNextPage === false) {
        return resolve(result);
      }

      if (!triesLeft) {
        return reject(new Error("Max tries exceeded"));
      }

      await next();

      fetch(listApi, --triesLeft);
    })(listApi, tries);
  });
};

export const getShopAttributes = async ({
  categoryId = null,
  collectionId = null,
}) => {
  const { apolloClient } = await getSaleorApi();

  const { data } = await apolloClient.query({
    query: shopAttributesQuery,
    variables: {
      categoryId,
      collectionId,
      channel: channelSlug,
    },
  });

  return data?.attributes?.edges.map((e) => e.node) || [];
};

export const getTotalProducts = async () => {
  // TODO: Saleor doesn't give us totalCount for products that aren't "Show in product listings"

  // const { apolloClient } = await getSaleorApi();
  // const { data } = await apolloClient.query({ query: productTotalCountQuery });

  // For now, we'll estimate these values...
  const data = {
    all: { totalCount: 69265 },
    inStock: { totalCount: 69265 },
  };

  return data;
};

export const getCategoryLevels = async (level0Limit = 10, level1Limit = 20) => {
  const { apolloClient } = await getSaleorApi();

  const { data } = await apolloClient.query({
    query: categoryLevelsQuery,
    variables: {
      level0: level0Limit,
      level1: level1Limit,
    },
  });

  return data;
};

export const getShopConfig = async () => {
  const { apolloClient } = await getSaleorApi();

  const shopConfig = await apolloClient
    .query({ query: getShop })
    .then(({ data }) => data?.shop);

  const menus = await apolloClient
    .query({
      query: shopMenusQuery,
      variables: {
        channel: channelSlug,
        main: "main",
        kitchens: "main-kitchens",
        bathrooms: "main-bathrooms",
        boilers: "main-boilers",
      },
    })
    .then(({ data }) => data);

  const footerMenus = await apolloClient
    .query({
      query: shopFooterMenusQuery,
      variables: {
        channel: channelSlug,
        about: "footer-about",
        support: "footer-support",
        shop: "footer-shop",
      },
    })
    .then(({ data }) => data);

  return { shopConfig, menus, footerMenus };
};

export const getProductDetails = async (slug) => {
  const { apolloClient } = await getSaleorApi();

  let { product } = await apolloClient
    .query({
      query: productDetailsQuery,
      variables: {
        slug: slug,
        channel: channelSlug,
        variantSelection: VariantAttributeScope.VARIANT_SELECTION,
      },
      fetchPolicy: "network-only",
    })
    .then(({ data }) => data);

  // Replace product.attribute[].values[].file.url (Saleor bug)
  product.attributes = fixFileAttributeValueUrl(product.attributes);

  return product;
};

export const getOrderDetails = async (token) => {
  const { apolloClient } = await getSaleorApi();

  const order = await apolloClient
    .query({
      query: orderDetailsByTokenQuery,
      variables: { token },
    })
    .then(({ data }) => data?.orderByToken);

  return order;
};

export const getPages = async () => {
  const { apolloClient } = await getSaleorApi();

  const { data } = await apolloClient.query({ query: pagesQuery });

  let pages = data.pages.edges.filter(
    ({ node }) => node.pageType.slug === "page"
  );

  return pages.map((e) => e.node);
};

export const getPageDetails = async (slug) => {
  const { apolloClient } = await getSaleorApi();

  const { page } = await apolloClient
    .query({
      query: pageDetailsQuery,
      variables: { slug: slug },
      fetchPolicy: "network-only",
    })
    .then(({ data }) => data);

  return page;
};

export const getKitchenRanges = async () => {
  const { apolloClient } = await getSaleorApi();

  const { data } = await apolloClient.query({
    query: kitchenRangesQuery,
  });

  const ranges = data?.pages?.edges.map((e) => ({
    ...e.node,
    ...kitchenRangeConfig[e.node.slug],
  }));

  return ranges || [];
};

export const getKitchenRangeDetails = async (slug) => {
  const { apolloClient } = await getSaleorApi();

  const { page } = await apolloClient
    .query({
      query: kitchenRangeDetailsQuery,
      variables: { slug },
    })
    .then(({ data }) => data);

  const range = formatKitchenRangeData({
    ...page,
    ...kitchenRangeConfig[page.slug],
  });

  return range;
};

export const getKitchenRangeComponents = async (slug) => {
  const { apolloClient } = await getSaleorApi();

  let products = [];
  let hasNextPage = true;
  let cursor = null;

  while (hasNextPage) {
    const { data } = await apolloClient.query({
      query: kitchenRangeComponentsQuery,
      variables: {
        slug: slug,
        channel: channelSlug,
        first: 20,
        sortBy: { field: "NAME", direction: "ASC" },
        after: cursor,
      },
    });

    let chunk = data.collection.products.edges.map((e) => e.node) || [];
    products = [...products, ...chunk];

    hasNextPage = data.collection.products.pageInfo.hasNextPage;
    cursor = data.collection.products.pageInfo.endCursor;
  }

  return products;
};

// Saleor Bug where AttributeValue file url is not using AWS
// Mutation is uploading to AWS, but query isn't returning
const fixFileAttributeValueUrl = (attributes) => {
  return attributes.map((attribute) => {
    return {
      ...attribute,
      values: attribute.values.map((value) => {
        if (!value?.file) return value;

        return {
          ...value,
          file: {
            ...value.file,
            url: value.file.url.replace(
              "https://app.tradepricesdirect.com",
              "https://tradepricesdirect.s3.amazonaws.com"
            ),
          },
        };
      }),
    };
  });
};
