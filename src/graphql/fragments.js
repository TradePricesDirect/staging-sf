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
