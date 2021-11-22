import {
  getKitchenRanges,
  getKitchenRangeDetails,
  getKitchenRangeComponents,
} from "utils/ssr";
import { incrementalStaticRegenerationRevalidate } from "core/constants";
import KitchenRangePage from "views/KitchenRange";

export default KitchenRangePage;

export async function getStaticPaths() {
  const ranges = await getKitchenRanges();

  const paths = ranges.map(({ slug }) => ({ params: { slug } }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params: { slug } }) {
  const range = await getKitchenRangeDetails(slug);

  // const products = await getKitchenRangeComponents(slug);

  const products = [];

  return {
    revalidate: incrementalStaticRegenerationRevalidate,
    props: { range, products },
  };
}
