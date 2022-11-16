import { getSaleorApi, getCategoriesByMetadata } from "utils/ssr";
import { incrementalStaticRegenerationRevalidate } from "core/constants";
import BoilersPage from "views/Heating";

export default BoilersPage;

export async function getStaticProps() {
  const { api } = await getSaleorApi();

  const { data: boilers } = await api.categories.getDetails({
    slug: "boilers",
  });

  const boilerTypes = await getCategoriesByMetadata("boilers.type", "true");

  const heating = await getCategoriesByMetadata("boilers.heating", "true");

  const consumables = await getCategoriesByMetadata(
    "boilers.consumables",
    "true"
  );

  return {
    revalidate: incrementalStaticRegenerationRevalidate,
    props: {
      boilers,
      boilerTypes,
      heating,
      consumables,
    },
  };
}
