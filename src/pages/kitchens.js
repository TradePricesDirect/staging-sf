import {
  getSaleorApi,
  getKitchenRanges,
  getCategoriesByMetadata,
} from "utils/ssr";
import { incrementalStaticRegenerationRevalidate } from "core/constants";
import KitchensPage from "views/Kitchens";

export default KitchensPage;

export async function getStaticProps() {
  const { api } = await getSaleorApi();

  const { data: kitchens } = await api.categories.getDetails({
    slug: "kitchens",
  });

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
      kitchens,
      appliances,
      finishingTouches,
    },
  };
}
