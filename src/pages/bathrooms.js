import { getSaleorApi, getCategoriesByMetadata } from "utils/ssr";
import { incrementalStaticRegenerationRevalidate } from "core/constants";
import BathroomsPage from "views/Bathrooms";

export default BathroomsPage;

export async function getStaticProps() {
  const { api } = await getSaleorApi();

  const { data: bathrooms } = await api.categories.getDetails({
    slug: "bathrooms",
  });

  const featured = await getCategoriesByMetadata("bathrooms.featured", "true");

  const finishingTouches = await getCategoriesByMetadata(
    "bathrooms.finishing.touches",
    "true"
  );

  return {
    revalidate: incrementalStaticRegenerationRevalidate,
    props: {
      bathrooms,
      featured,
      finishingTouches,
    },
  };
}
