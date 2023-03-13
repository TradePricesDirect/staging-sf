import {
  exhaustList,
  getCategories,
  getSaleorApi,
  getShopAttributes,
} from "utils/ssr";
import { incrementalStaticRegenerationRevalidate } from "core/constants";
import CategoryView from "views/Category";
import _ from "lodash";
import paths from "core/paths";

export default CategoryView;

export async function getStaticPaths() {
  const { api } = await getSaleorApi();

  const { data } = await exhaustList(api.categories.getList({ first: 100 }));

  const paths = data.map(({ slug }) => ({ params: { slug } }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params: { slug } }) {
  const { api } = await getSaleorApi();

  const { data: category } = await api.categories.getDetails({ slug });
  const categories = await getCategories();
  const ancestors = await api.categories
    .getAncestors({ first: 1, id: category.id })
    .then(({ data }) => data);

  if (ancestors?.length) {
    category.ancestors = ancestors;
  }
  const ancestor = ancestors[0];

  if (ancestor) {
    const ancestorChildren = _.find(categories, [
      "slug",
      ancestor.slug,
    ]).children;
    category.children =
      _.find(ancestorChildren, ["slug", slug])?.children || [];
  } else {
    category.children = _.find(categories, ["slug", slug])?.children || [];
  }

  // if no subcategories, redirect to PLP
  // if (!category.children.length) {
  //   return {
  //     redirect: {
  //       destination: paths.plp.replace("[slug]", slug),
  //     },
  //   };
  // }

  // Get attributes
  // const attributes = await getShopAttributes({ categoryId: id });

  return {
    revalidate: incrementalStaticRegenerationRevalidate,
    props: {
      category,
    },
  };
}
