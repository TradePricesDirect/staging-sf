// import { incrementalStaticRegenerationRevalidate } from "core/constants";
import { getProductDetails, getSaleorApi, getStory } from "utils/ssr";
import ProductPage from "views/Product";

export default ProductPage;

export async function getServerSideProps({ params: { slug } }) {
  const { api } = await getSaleorApi();
  const product = await getProductDetails(slug);

  if (!product) return { notFound: true };

  const { data: category } = await api.categories.getDetails({
    slug: product.category.slug,
  });
  await api.categories
    .getAncestors({ first: 5, id: category.id })
    .then(({ data }) => (category.ancestors = data));

  const storyblokData = await getStory("pdp");

  return {
    props: {
      product,
      category,
      story: storyblokData ? storyblokData.story : false,
      key: storyblokData ? storyblokData.story.id : false,
    },
  };
}

// SSG works, but it's quite slow to build!
// export async function getStaticPaths() {
//   const products = await getAllProducts();

//   const paths = products.map(({ slug }) => ({ params: { slug } }));

//   return { paths, fallback: false };
// }

// export async function getStaticProps({ params: { slug } }) {
//   const product = await getProductDetails(slug);

//   return {
//     revalidate: incrementalStaticRegenerationRevalidate,
//     props: { product },
//   };
// }
