import { getCategoriesByLevel } from "utils/ssr";
import ShopPage from "views/Shop";

export default ShopPage;

export async function getStaticProps() {
  const categoriesLevel0 = await getCategoriesByLevel(0, 100);
  const categoriesLevel1 = await getCategoriesByLevel(1, 100);

  return {
    props: {
      categoriesLevel0,
      categoriesLevel1,
    },
  };
}
