import gql from "graphql-tag";

export const attributeFragment = gql`
  fragment Attribute on Attribute {
    id
    name
    slug
    choices(first: 100) {
      edges {
        node {
          id
          name
          slug
        }
      }
    }
  }
`;

export const menuItemFragment = gql`
  fragment MenuItem on MenuItem {
    id
    name
    category {
      id
      name
      slug
    }
    url
    collection {
      id
      name
      slug
    }
    page {
      slug
    }
    parent {
      id
    }
  }
`;
