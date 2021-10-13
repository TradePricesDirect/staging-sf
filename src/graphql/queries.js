import gql from "graphql-tag";
import { useQuery } from "react-apollo";
import { baseCategoryFragment } from "@saleor/sdk/lib/fragments/categories";
import {
  baseProductFragment,
  selectedAttributeFragment,
  productVariantFragment,
  productPricingFragment,
} from "@saleor/sdk/lib/fragments/products";
import { attributeFragment, menuItemFragment } from "./fragments";

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

export const shopMenusQuery = gql`
  ${menuItemFragment}
  query ShopMenusQuery(
    $channel: String!
    $main: String!
    $kitchens: String!
    $bathrooms: String!
    $boilers: String!
  ) {
    main: menu(channel: $channel, slug: $main) {
      items {
        ...MenuItem
        children {
          ...MenuItem
        }
      }
    }
    kitchens: menu(channel: $channel, slug: $kitchens) {
      name
      items {
        ...MenuItem
        children {
          ...MenuItem
        }
      }
    }
    bathrooms: menu(channel: $channel, slug: $bathrooms) {
      name
      items {
        ...MenuItem
        children {
          ...MenuItem
        }
      }
    }
    boilers: menu(channel: $channel, slug: $boilers) {
      name
      items {
        ...MenuItem
        children {
          ...MenuItem
        }
      }
    }
  }
`;

export const shopFooterMenusQuery = gql`
  ${menuItemFragment}
  query ShopFooterMenusQuery(
    $channel: String!
    $about: String!
    $support: String!
    $shop: String!
  ) {
    about: menu(channel: $channel, slug: $about) {
      name
      items {
        ...MenuItem
        children {
          ...MenuItem
        }
      }
    }
    support: menu(channel: $channel, slug: $support) {
      name
      items {
        ...MenuItem
        children {
          ...MenuItem
        }
      }
    }
    shop: menu(channel: $channel, slug: $shop) {
      name
      items {
        ...MenuItem
        children {
          ...MenuItem
        }
      }
    }
  }
`;

export const categoryLevelsQuery = gql`
  ${baseCategoryFragment}
  query CategoryLevels($level0: Int!, $level1: Int!) {
    level0: categories(first: $level0, level: 0) {
      edges {
        node {
          ...BaseCategory
          backgroundImage {
            url
            alt
          }
        }
      }
    }
    level1: categories(first: $level1, level: 1) {
      edges {
        node {
          ...BaseCategory
          backgroundImage {
            url
            alt
          }
        }
      }
    }
  }
`;

export const productDetailsQuery = gql`
  ${baseProductFragment}
  ${selectedAttributeFragment}
  ${productVariantFragment}
  ${productPricingFragment}
  query ProductDetails(
    $id: ID
    $slug: String
    $countryCode: CountryCode
    $channel: String
    $variantSelection: VariantAttributeScope = ALL
  ) {
    product(id: $id, slug: $slug, channel: $channel) {
      ...BaseProduct
      ...ProductPricingField
      description
      category {
        id
        name
        slug
        products(first: 3, channel: $channel) {
          edges {
            node {
              ...BaseProduct
              ...ProductPricingField
              category {
                id
                name
                slug
              }
            }
          }
        }
      }
      images {
        id
        url
      }
      attributes {
        ...SelectedAttributeFields
      }
      defaultVariant {
        ...ProductVariantFields
      }
      variants {
        ...ProductVariantFields
      }
      isAvailable
    }
  }
`;
