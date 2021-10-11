import { exhaustList, getSaleorApi, getShopAttributes } from "utils/ssr";
import { incrementalStaticRegenerationRevalidate } from "core/constants";
import CategoryView from "views/Category";

export default CategoryView;

export async function getStaticPaths() {
  const { api } = await getSaleorApi();

  const { data } = await exhaustList(api.categories.getList({ first: 100 }));

  const paths = data.map(({ slug }) => ({ params: { slug } }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params: { slug } }) {
  const { api } = await getSaleorApi();

  const { data: details } = await api.categories.getDetails({ slug });

  const { id } = details;

  // Get category ancestors
  const ancestors = await api.categories
    .getAncestors({ first: 5, id })
    .then(({ data }) => data);

  // Get category children
  const children = await api.categories
    .getChildren({ first: 100, id })
    .then(({ data }) => data);

  // Get attributes
  const attributes = await getShopAttributes({ categoryId: id });

  return {
    revalidate: incrementalStaticRegenerationRevalidate,
    props: {
      data: {
        id,
        details,
        ancestors,
        children,
        attributes,
      },
    },
  };
}
