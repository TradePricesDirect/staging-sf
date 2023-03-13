// import { getProductsWithAttributes } from "./../../utils/ssr";
import {
  baseProductFragment,
  productPricingFragment,
  selectedAttributeFragment,
} from "@saleor/sdk/lib/fragments/products";
// import { productList } from "@saleor/sdk/lib/queries/products";
import { channelSlug } from "core/constants";
import { convertSortByFromString, convertToAttributeScalar } from "core/utils";
import { productsWithAttributesQuery, useTypedQuery } from "graphql/queries";
import gql from "graphql-tag";
import { pageInfo } from "@saleor/sdk/lib/fragments/pageInfo";
import { useLazyQuery } from "react-apollo";

export const ProductsQuery = gql`
  ${baseProductFragment}
  ${productPricingFragment}
  ${pageInfo}
  query ProductList(
    $before: String
    $after: String
    $first: Int
    $last: Int
    $sortBy: ProductOrder
    $filter: ProductFilterInput
    $channel: String
  ) {
    products(
      before: $before
      after: $after
      first: $first
      last: $last
      sortBy: $sortBy
      filter: $filter
      channel: $channel
    ) {
      edges {
        node {
          ...BaseProduct
          ...ProductPricingField
          category {
            id
            name
            slug
          }
          variants {
            id
          }
          defaultVariant {
            id
            name
            quantityAvailable
          }
        }
      }
      totalCount
      pageInfo {
        ...PageInfo
        startCursor
        hasPreviousPage
      }
    }
  }
`;

// export const useProductsSearchQuery = (filter) => {
//   const variables = {
//     filter: {
//       search: filter.search,
//       price: {
//         lte: filter.priceLte,
//         gte: filter.priceGte,
//       },
//     },
//     channel: channelSlug,
//     first: filter.perPage,
//     sortBy: convertSortByFromString(filter.sortBy),
//   };

//   return useTypedQuery(searchProductsQuery, {
//     variables,
//     fetchPolicy: "cache-and-network",
//   });
// };

export const useProductsQueryLazy: any = (
  filter,
  first?,
  last?,
  before?,
  after?,
  sortBy?,
  lazy?
  // ids: { categoryId?: string; collectionId?: string } = {}
) => {
  // const { categoryId, collectionId } = ids;

  const variables = {
    filter: {
      ...filter,
      // attributes: filter.attributes
      //   ? convertToAttributeScalar(filter.attributes)
      //   : [],
    },
    channel: channelSlug,
    first,
    last,
    before,
    after,
    sortBy: convertSortByFromString(sortBy),
  };
  return useLazyQuery(ProductsQuery, {
    variables,
    fetchPolicy: "cache-and-network",
    // skip: !(categoryId || collectionId),
  });
};

// export const useProductsQuery: any = (
//   filter,
//   first?,
//   last?,
//   before?,
//   after?,
//   sortBy?,
//   lazy?
//   // ids: { categoryId?: string; collectionId?: string } = {}
// ) => {
//   // const { categoryId, collectionId } = ids;

//   const variables = {
//     filter: {
//       ...filter,
//       attributes: filter.attributes
//         ? convertToAttributeScalar(filter.attributes)
//         : [],
//     },
//     channel: channelSlug,
//     first,
//     last,
//     before,
//     after,
//     sortBy: convertSortByFromString(sortBy),
//   };
//   return useTypedQuery(ProductsQuery, {
//     variables,
//     fetchPolicy: "cache-and-network",
//     // skip: !(categoryId || collectionId),
//   });
// };
