import { gql } from "@apollo/client";
import client from "lib/apollo-client";
import CategoryPage from "views/Category";

export default CategoryPage;

export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`
      query AllCategoriesQuery {
        categories(first: 100) {
          edges {
            node {
              name
              slug
            }
          }
        }
      }
    `,
  });

  const categories = data.categories.edges.map((e) => e.node) || [];

  const paths = categories.map(({ slug }) => ({ params: { slug } }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params: { slug } }) {
  const { data } = await client.query({
    query: gql`
      query CategoryPageQuery($slug: String!) {
        category(slug: $slug) {
          name
          slug
        }
      }
    `,
    variables: { slug },
  });

  return {
    props: {
      category: data.category,
    },
  };
}
