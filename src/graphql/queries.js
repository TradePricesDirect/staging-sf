import gql from "graphql-tag";
import { useQuery } from "react-apollo";
import { baseCategoryFragment } from "@saleor/sdk/lib/fragments/categories";
import {
  baseProductFragment,
  selectedAttributeFragment,
  productVariantFragment,
  productPricingFragment,
} from "@saleor/sdk/lib/fragments/products";
import { orderPriceFragment } from "@saleor/sdk/lib/fragments/order";
import { checkoutPriceFragment } from "@saleor/sdk/lib/fragments/checkout";
import {
  checkoutAddressFragment,
  checkoutProductVariantFragment,
} from "@saleor/sdk/lib/fragments/checkout";
import { attributeFragment, menuItemFragment } from "./fragments";
import { useCheckout } from "@saleor/sdk";

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

export const categoriesByMetadataQuery = gql`
  ${baseCategoryFragment}
  query CategoryByMetadata($first: Int!, $filter: CategoryFilterInput!) {
    categories(first: $first, filter: $filter) {
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
        products(first: 10, channel: $channel) {
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
        }
      }
      images {
        id
        url
      }
      attributes {
        ...SelectedAttributeFields
      }
      metadata {
        key
        value
      }
      defaultVariant {
        id
      }
      variants {
        ...ProductVariantFields
        trackInventory
      }
      isAvailable
    }
  }
`;

export const orderDetailsByTokenQuery = gql`
  ${orderPriceFragment}
  ${checkoutAddressFragment}
  ${checkoutProductVariantFragment}
  query OrderByToken($token: UUID!) {
    orderByToken(token: $token) {
      id
      token
      number
      created
      paymentStatus
      paymentStatusDisplay
      status
      statusDisplay
      shippingAddress {
        ...Address
      }
      billingAddress {
        ...Address
      }
      subtotal {
        ...OrderPrice
      }
      total {
        ...OrderPrice
      }
      shippingPrice {
        ...OrderPrice
      }
      lines {
        id
        productName
        quantity
        variant {
          ...ProductVariant
        }
        unitPrice {
          currency
          ...OrderPrice
        }
        totalPrice {
          currency
          ...OrderPrice
        }
      }
    }
  }
`;

export const pagesQuery = gql`
  query Pages {
    pages(first: 100) {
      edges {
        node {
          id
          slug
          pageType {
            slug
          }
        }
      }
    }
  }
`;

export const pageDetailsQuery = gql`
  query PageDetails($slug: String!) {
    page(slug: $slug) {
      pageType {
        slug
      }
      id
      title
      content
      attributes {
        attribute {
          name
        }
        values {
          name
          slug
        }
      }
      metadata {
        key
        value
      }
    }
  }
`;

export const kitchenRangesQuery = gql`
  query KitchenRanges {
    pages(
      first: 100
      sortBy: { field: TITLE, direction: ASC }
      filter: { metadata: { key: "Kitchen Range", value: "true" } }
    ) {
      edges {
        node {
          id
          slug
          title
          attributes {
            attribute {
              name
              slug
            }
            values {
              name
              slug
            }
          }
        }
      }
    }
  }
`;

export const kitchenRangeDetailsQuery = gql`
  query KitchenRangeDetails($slug: String!) {
    page(slug: $slug) {
      id
      title
      slug
      content
      metadata {
        key
        value
      }
    }
  }
`;

export const kitchenRangeComponentsQuery = gql`
  ${checkoutPriceFragment}
  query KitchenRangeComponents(
    $slug: String!
    $channel: String
    $first: Int!
    $after: String
    $sortBy: ProductOrder
  ) {
    collection(slug: $slug, channel: $channel) {
      id
      products(first: $first, after: $after, sortBy: $sortBy) {
        totalCount
        pageInfo {
          endCursor
          hasNextPage
        }
        edges {
          node {
            id
            name
            slug
            attributes {
              attribute {
                id
                slug
              }
              values {
                id
                slug
                name
              }
            }
            variants {
              id
              sku
              pricing {
                price {
                  ...Price
                }
              }
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
      }
    }
  }
`;

export const checkoutMetadataQuery = gql`
  query CheckoutMetaData($token: UUID!) {
    checkout(token: $token) {
      id
      metadata {
        key
        value
      }
    }
  }
`;

export const useCheckoutMetadata = () => {
  const { checkout } = useCheckout();

  const token = checkout?.token;

  const { data, loading } = useQuery(checkoutMetadataQuery, {
    variables: { token },
    fetchPolicy: "network-only",
    skip: !token,
  });

  return {
    data: data?.checkout?.metadata || [],
    loading,
  };
};

export const customerSearchQuery = gql`
  query CustomerSearch($search: String!) {
    customers(first: 100, filter: { search: $search }) {
      totalCount
      edges {
        node {
          id
          firstName
          lastName
          email
        }
      }
    }
  }
`;
