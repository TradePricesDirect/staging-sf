import { getKitchenRangeDetails, getKitchenRanges } from "utils/ssr";
import KitchenRangePage from "views/KitchenRange";

export default KitchenRangePage;

export async function getStaticPaths() {
  const ranges = await getKitchenRanges();

  const paths = ranges.map(({ slug }) => ({ params: { slug } }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params: { slug } }) {
  const range = await getKitchenRangeDetails(slug);

  return { props: { range } };
}
