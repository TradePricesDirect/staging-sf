// import { incrementalStaticRegenerationRevalidate } from "core/constants";
import { getProductDetails } from "utils/ssr";
import ProductPage from "views/Product";

export default ProductPage;

export async function getServerSideProps({ params: { slug } }) {
  const product = await getProductDetails(slug);

  if (!product) return { notFound: true };

  return {
    props: { product },
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
