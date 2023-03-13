import {
  exhaustList,
  getCategories,
  getSaleorApi,
  getShopAttributes,
} from "utils/ssr";
import { incrementalStaticRegenerationRevalidate } from "core/constants";
import ProductListView from "views/ProductList";

export default ProductListView;

// export async function getStaticPaths() {
//   const { api } = await getSaleorApi();

//   const { data } = await exhaustList(api.categories.getList({ first: 100 }));

//   const paths = data.map(({ slug }) => ({ params: { slug } }));

//   return { paths, fallback: false };
// }

export async function getStaticProps() {
  const { api } = await getSaleorApi();

  // const { data: details } = await api.categories.getDetails({ slug });

  // const { id } = details;

  // Get category ancestors
  // const ancestors = await api.categories
  //   .getAncestors({ first: 5, id })
  //   .then(({ data }) => data);

  // Get category children
  // const children = await api.categories
  //   .getChildren({ first: 100, id })
  //   .then(({ data }) => data);

  const categories = await getCategories();
  // const children =
  //   categories.filter((category) => category.slug === slug)[0]?.children || [];

  // const categories = await api.categories.get

  // Get attributes
  const attributesData = await getShopAttributes({});

  const attributes = attributesData.filter(
    (attribute) => attribute.choices.edges.length > 1
  );

  return {
    revalidate: incrementalStaticRegenerationRevalidate,
    props: {
      attributes,
      // data: {
      // id,
      // details,
      // children,
      // ancestors,
      // children,
      // },
    },
  };
}
