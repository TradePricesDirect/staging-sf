import { gql } from "@apollo/client";
import client from "lib/apollo-client";
import HomePage from "views/Home";

export default HomePage;

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query HomePageQuery {
        shop {
          name
        }
      }
    `,
  });

  return {
    props: {
      shop: data.shop,
    },
  };
}
