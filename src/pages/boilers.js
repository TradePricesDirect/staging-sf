import { getCategoriesByMetadata } from "utils/ssr";
import { incrementalStaticRegenerationRevalidate } from "core/constants";
import BoilersPage from "views/Boilers";

export default BoilersPage;

export async function getStaticProps() {
  const boilerTypes = await getCategoriesByMetadata("boilers.type", "true");

  const heating = await getCategoriesByMetadata("boilers.heating", "true");

  const consumables = await getCategoriesByMetadata(
    "boilers.consumables",
    "true"
  );

  return {
    revalidate: incrementalStaticRegenerationRevalidate,
    props: {
      boilerTypes,
      heating,
      consumables,
    },
  };
}
