import { getCategoriesByMetadata } from "utils/ssr";
import { incrementalStaticRegenerationRevalidate } from "core/constants";
import BathroomsPage from "views/Bathrooms";

export default BathroomsPage;

export async function getStaticProps() {
  const featured = await getCategoriesByMetadata("bathrooms.featured", "true");

  const finishingTouches = await getCategoriesByMetadata(
    "bathrooms.finishing.touches",
    "true"
  );

  return {
    revalidate: incrementalStaticRegenerationRevalidate,
    props: {
      featured,
      finishingTouches,
    },
  };
}
