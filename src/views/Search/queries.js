import gql from "graphql-tag";
import {
  baseProductFragment,
  productPricingFragment,
} from "@saleor/sdk/lib/fragments/products";
import { pageInfo } from "@saleor/sdk/lib/fragments/pageInfo";
import { channelSlug } from "core/constants";
import { convertSortByFromString } from "core/utils";
import { useTypedQuery } from "graphql/queries";

const searchProductsQuery = gql`
  ${baseProductFragment}
  ${productPricingFragment}
  ${pageInfo}
  query ProductList(
    $after: String
    $first: Int!
    $sortBy: ProductOrder
    $filter: ProductFilterInput
    $channel: String
  ) {
    products(
      after: $after
      first: $first
      sortBy: $sortBy
      filter: $filter
      channel: $channel
    ) {
      edges {
        node {
          ...BaseProduct
          ...ProductPricingField
        }
      }
      totalCount
      pageInfo {
        ...PageInfo
      }
    }
  }
`;

export const useProductsSearchQuery = (filters) => {
  const variables = {
    filter: {
      search: filters.search,
      price: {
        lte: filters.priceLte,
        gte: filters.priceGte,
      },
    },
    channel: channelSlug,
    first: filters.perPage,
    sortBy: convertSortByFromString(filters.sortBy),
  };

  return useTypedQuery(searchProductsQuery, {
    variables,
    fetchPolicy: "cache-and-network",
  });
};
