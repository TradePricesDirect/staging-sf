import { SaleorManager, VariantAttributeScope } from "@saleor/sdk";
import { getShop } from "@saleor/sdk/lib/queries/shop";
import { apiUrl, channelSlug } from "core/constants";
import kitchenRangeConfig from "core/kitchen-ranges";
import {
  shopAttributesQuery,
  categoriesByLevelQuery,
  categoriesByMetadataQuery,
  categoryTreeQuery,
  shopFooterMenusQuery,
  productDetailsQuery,
  orderDetailsByTokenQuery,
  pagesQuery,
  pageDetailsQuery,
  kitchenRangesQuery,
  kitchenRangeDetailsQuery,
  kitchenRangeComponentsQuery,
  productTotalCountQuery,
} from "graphql/queries";
import _ from "lodash";
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

export const exhaustList = async (listApi, tries = 100) => {
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
  const { apolloClient } = await getSaleorApi();
  const { data } = await apolloClient.query({ query: productTotalCountQuery });

  return data;
};

export const getCategoriesByLevel = async (level, limit = 50) => {
  const { apolloClient } = await getSaleorApi();

  const { data } = await apolloClient.query({
    query: categoriesByLevelQuery,
    variables: {
      level: level,
      limit: limit,
    },
  });

  return data.categories.edges.map((e) => e.node) || [];
};

export const getCategoryTree = async () => {
  const { apolloClient } = await getSaleorApi();

  const { data } = await apolloClient.query({
    query: categoryTreeQuery,
  });

  const flattenEdges = ({ edges }) => {
    const items = _.sortBy(edges, "node.name");

    return items.map(({ node }) => {
      const children = node.children ? node.children : null;

      return {
        ...node,
        children: children ? flattenEdges(children) : null,
      };
    });
  };

  return flattenEdges(data.categories);
};

export const getCategoriesByMetadata = async (key, value, limit = 50) => {
  const { apolloClient } = await getSaleorApi();

  const { data } = await apolloClient.query({
    query: categoriesByMetadataQuery,
    variables: {
      first: limit,
      filter: { metadata: [{ key, value }] },
    },
  });

  return data.categories.edges.map((e) => e.node) || [];
};

export const getShopConfig = async () => {
  const { apolloClient } = await getSaleorApi();

  const { data } = await apolloClient.query({ query: getShop });

  return data?.shop;
};

export const getFooterMenus = async () => {
  const { apolloClient } = await getSaleorApi();

  const menus = await apolloClient
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

  return menus;
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

  if (!product) return null;

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
        first: 100,
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

export const getAllProducts = async () => {
  const { api } = await getSaleorApi();

  const { data } = await exhaustList(api.products.getList({ first: 100 }), 500);

  return data.filter(
    (product) => product.productType.slug !== "kitchen-range-component"
  );
};
