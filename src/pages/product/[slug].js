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
