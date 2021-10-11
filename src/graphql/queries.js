import gql from "graphql-tag";
import { useQuery } from "react-apollo";
import { attributeFragment } from "./fragments";

export const useTypedQuery = (query, options) => {
  const queryResult = useQuery(query, options);

  const loadMore = (mergeFn, endCursor) =>
    queryResult.fetchMore({
      query,
      updateQuery: (previousResults, { fetchMoreResult }) => {
        if (!fetchMoreResult) return previousResults;

        return mergeFn(previousResults, fetchMoreResult);
      },
      variables: { ...options?.variables, after: endCursor },
    });

  return { loadMore, ...queryResult };
};

export const shopAttributesQuery = gql`
  ${attributeFragment}
  query ShopAttributesQuery(
    $channel: String!
    $collectionId: ID
    $categoryId: ID
  ) {
    attributes(
      channel: $channel
      filter: {
        inCollection: $collectionId
        inCategory: $categoryId
        filterableInStorefront: true
      }
      first: 100
    ) {
      edges {
        node {
          ...Attribute
        }
      }
    }
  }
`;

export const productTotalCountQuery = gql`
  query ProductTotalCountQuery {
    all: products {
      totalCount
    }
    inStock: products(filter: { stockAvailability: IN_STOCK }) {
      totalCount
    }
  }
`;
