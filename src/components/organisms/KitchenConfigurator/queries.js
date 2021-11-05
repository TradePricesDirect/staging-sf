import gql from "graphql-tag";
import { channelSlug } from "core/constants";
import { useTypedQuery } from "graphql/queries";

export const useProductsQuery = (options, colors) => {
  const variables = {
    ...options,
    channel: channelSlug,
    first: 100,
    sortBy: { field: "NAME", direction: "ASC" },
  };

  // TODO: filter the below results by the colors object...

  return useTypedQuery(kitchenRangeComponentsQuery, {
    variables,
    fetchPolicy: "cache-and-network",
  });
};

const kitchenRangeComponentsQuery = gql`
  query KitchenRangeComponents(
    $range: String!
    $step: String!
    $category: String!
    $subcategory: String!
    $first: Int!
    $sortBy: ProductOrder
    $channel: String
  ) {
    products(
      first: $first
      channel: $channel
      sortBy: $sortBy
      filter: {
        attributes: [
          { slug: "kitchen-range", values: [$range] }
          { slug: "kitchen-range-step", values: [$step] }
          { slug: "kitchen-range-category", values: [$category] }
          { slug: "kitchen-range-subcategory", values: [$subcategory] }
        ]
      }
    ) {
      edges {
        node {
          id
          name
          slug
          variants {
            id
            sku
            attributes {
              attribute {
                id
                slug
              }
              values {
                id
                slug
              }
            }
          }
        }
      }
      totalCount
    }
  }
`;
