import { getKitchenRanges } from "utils/ssr";
import { incrementalStaticRegenerationRevalidate } from "core/constants";
import KitchenRanges from "views/KitchenRanges";

export default KitchenRanges;

export async function getStaticProps() {
  const ranges = await getKitchenRanges();

  return {
    revalidate: incrementalStaticRegenerationRevalidate,
    props: {
      ranges,
    },
  };
}
