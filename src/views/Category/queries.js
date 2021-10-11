import { productList } from "@saleor/sdk/lib/queries/products";
import { channelSlug } from "core/constants";
import { convertSortByFromString, convertToAttributeScalar } from "core/utils";
import { useTypedQuery } from "graphql/queries";

export const useProductsQuery = (filters, ids) => {
  const { categoryId, collectionId } = ids;

  const variables = {
    filter: {
      collections: collectionId ? [collectionId] : [],
      categories: categoryId ? [categoryId] : [],
      price: {
        lte: filters.priceLte,
        gte: filters.priceGte,
      },
      attributes: filters.attributes
        ? convertToAttributeScalar(filters.attributes)
        : [],
    },
    channel: channelSlug,
    first: filters.perPage,
    sortBy: convertSortByFromString(filters.sortBy),
  };

  return useTypedQuery(productList, {
    variables,
    fetchPolicy: "no-cache",
    // fetchPolicy: "cache-and-network",
    skip: !(categoryId || collectionId),
  });
};
