import { gql } from "@apollo/client";
import client from "lib/apollo-client";
import CollectionPage from "views/Collection";

export default CollectionPage;

export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`
      query AllCollectionsQuery {
        collections(first: 100, channel: "uk") {
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

  const collections = data.collections.edges.map((e) => e.node) || [];

  const paths = collections.map(({ slug }) => ({ params: { slug } }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params: { slug } }) {
  const { data } = await client.query({
    query: gql`
      query CollectionPageQuery($slug: String!) {
        collection(slug: $slug) {
          name
          slug
        }
      }
    `,
    variables: { slug },
  });

  return {
    props: {
      collection: data.collection,
    },
  };
}
