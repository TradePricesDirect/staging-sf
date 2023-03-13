import {
  exhaustList,
  getCategories,
  // getProductsWithAttributes,
  getSaleorApi,
  getShopAttributes,
} from "utils/ssr";
import { incrementalStaticRegenerationRevalidate } from "core/constants";
import ProductListView from "views/ProductList";
import { convertSortByFromString, convertToAttributeScalar } from "core/utils";
import { useTypedQuery } from "graphql/queries";

export default ProductListView;

export async function getStaticPaths() {
  const { api } = await getSaleorApi();

  const { data } = await exhaustList(api.categories.getList({ first: 100 }));

  const paths = data.map(({ slug }) => ({ params: { slug } }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params: { slug } }) {
  const { api } = await getSaleorApi();

  const { data: category } = await api.categories.getDetails({ slug });
  await api.categories
    .getAncestors({ first: 5, id: category.id })
    .then(({ data }) => (category.ancestors = data));

  // const categories = await getCategories();
  // const children =
  //   categories.filter((category) => category.slug === slug)[0]?.children || [];
  // Get attributes
  const attributes = await getShopAttributes({ categoryId: category.id });

  // const products_ = await getProductsWithAttributes({
  //   categoryId: category.id,
  //   // collectionId: null,
  //   // search: null,
  // });

  return {
    revalidate: incrementalStaticRegenerationRevalidate,
    props: {
      // shop: attributes,
      category,
      attributes,
      // products_,
    },
  };
}
