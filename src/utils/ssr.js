import { SaleorManager } from "@saleor/sdk";
import { getShop } from "@saleor/sdk/lib/queries/shop";
import { apiUrl, channelSlug } from "core/constants";
import {
  shopAttributesQuery,
  productTotalCountQuery,
  shopMenusQuery,
  shopFooterMenusQuery,
} from "graphql/queries";

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
  const { apolloClient } = await getSaleorApi();

  const { data } = await apolloClient.query({ query: productTotalCountQuery });

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
