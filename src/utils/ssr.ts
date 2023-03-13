import {
  ConnectResult,
  SaleorManager,
  VariantAttributeScope,
} from "@saleor/sdk";
import { getShop } from "@saleor/sdk/lib/queries/shop";
import { apiUrl, brands, channelSlug } from "core/constants";
import kitchenRangeConfig from "core/kitchen-ranges";
import {
  shopAttributesQuery,
  categoriesByLevelQuery,
  categoriesByMetadataQuery,
  categoriesQuery,
  shopFooterMenusQuery,
  productDetailsQuery,
  orderDetailsByTokenQuery,
  pagesQuery,
  pageDetailsQuery,
  kitchenRangesQuery,
  kitchenRangeDetailsQuery,
  kitchenRangeComponentsQuery,
  productTotalCountQuery,
  featuredCategoriesQuery,
  productsWithAttributesQuery,
} from "graphql/queries";
import _ from "lodash";
import { formatKitchenRangeData } from "utils/kitchen-ranges";
import {
  getStoryblokApi,
  ISbStoryParams,
  ISbStoriesParams,
} from "@storyblok/react";

let CONNECTION: ConnectResult;

export const getSaleorApi = async (): Promise<any> => {
  if (!CONNECTION) {
    const manager = new SaleorManager(
      { apiUrl, channel: channelSlug },
      { options: { ssrMode: true } }
    );

    CONNECTION = await manager.connect();
  }

  return CONNECTION;
};

export const exhaustList = async (listApi, tries = 100): Promise<any> => {
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
  search = null,
}) => {
  const { apolloClient } = await getSaleorApi();

  const { data } = await apolloClient.query({
    query: shopAttributesQuery,
    variables: {
      categoryId,
      collectionId,
      search,
      channel: channelSlug,
    },
  });

  return data?.attributes?.edges.map((e) => e.node) || [];
};

// export const getProductsWithAttributes = async ({
//   categoryId = null,
//   collectionId = null,
//   search = null,
// }) => {
//   const { apolloClient } = await getSaleorApi();

//   const data = await apolloClient.query({
//     query: productsWithAttributesQuery,
//     variables: {
//       first: 20,
//       filter: {
//         categories: [categoryId],
//       },
//     },
//   });

//   return data;
// };

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

export const getCategories = async () => {
  const { apolloClient } = await getSaleorApi();

  const { data } = await apolloClient.query({
    query: categoriesQuery,
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
        about: "About",
        support: "Support",
        shop: "Shop",
      },
    })
    .then(({ data }) => data);

  return menus;
};

export const getFeaturedCategories = async () => {
  const { apolloClient } = await getSaleorApi();

  const categories = await apolloClient
    .query({
      query: featuredCategoriesQuery,
      variables: {
        channel: channelSlug,
        featured: "Featured",
      },
    })
    .then(
      ({
        data: {
          featured: { items },
        },
      }) => items.map((item) => item.category.slug)
    );

  return categories;
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

  let products: any[] = [];
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

export const getStory = async (slug: string) => {
  let sbParams: ISbStoryParams = {
    version: "draft", // or 'published'
  };
  const storyblokApi = getStoryblokApi();
  const { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);
  return data;
};

export const getStories = async (folder: string) => {
  let sbParams: ISbStoriesParams = {
    version: "draft", // or 'published'
    starts_with: `${folder}/`,
  };
  const storyblokApi = getStoryblokApi();
  const { data } = await storyblokApi.get(`cdn/stories`, sbParams);
  return data;
};

export const getBrands = async () => {
  const sbParams: ISbStoriesParams = {
    version: "draft",
    datasource: "brands",
  };
  const storyblokApi = getStoryblokApi();
  const data = await storyblokApi.get(`cdn/datasource_entries`, sbParams);
  return data;
};

export const getCarousels = async (storyblokData) => {
  const carouselBlocks =
    storyblokData.story.content.body?.filter(
      (block) => block.component === "DataCarousel"
    ) || [];
  const carouselData = await Promise.all(
    carouselBlocks.map((block) => {
      const { type, limit } = block;
      const parts = type.split(".");
      const root = parts[0];
      const filter = parts[1];
      if (root === "categories") {
        switch (filter) {
          case "level":
            return getCategoriesByLevel(parts[2], limit);
          case "meta":
            return getCategoriesByMetadata(
              parts.slice(2).join("."),
              "true",
              limit
            );
        }
      }
      if (root === "brands") {
        return brands;
      }
      return;
    })
  );

  const carousels = {};

  carouselBlocks.forEach((block, index) => {
    if (carouselData[index] !== undefined) {
      carousels[block._uid] = carouselData[index];
    }
  });

  return carousels;
};

export const getStoryBlokAssets = async (folder: number) => {
  let sbParams: any = {
    in_folder: folder,
    per_page: 100,

    // filename: "",
  };
  const storyblokApi = getStoryblokApi();
  const { data } = await storyblokApi.get(`spaces/183479/assets/`, sbParams);
  return data;
};

// Storyblok.get("spaces/606/assets/", {})
//   .then((response) => {

//   })
//   .catch((error) => {

//   });
