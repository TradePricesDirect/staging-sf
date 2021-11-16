import { getKitchenRanges, getCategoriesByMetadata } from "utils/ssr";
import { incrementalStaticRegenerationRevalidate } from "core/constants";
import KitchensPage from "views/Kitchens";

export default KitchensPage;

export async function getStaticProps() {
  const ranges = await getKitchenRanges();

  const appliances = await getCategoriesByMetadata(
    "kitchens.appliances",
    "true"
  );

  const finishingTouches = await getCategoriesByMetadata(
    "kitchens.finishing.touches",
    "true"
  );

  return {
    revalidate: incrementalStaticRegenerationRevalidate,
    props: {
      ranges,
      appliances,
      finishingTouches,
    },
  };
}
