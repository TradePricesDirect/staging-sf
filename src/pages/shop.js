import { getCategoryLevels } from "utils/ssr";
import ShopPage from "views/Shop";

export default ShopPage;

export async function getStaticProps() {
  const categories = await getCategoryLevels();

  return {
    props: {
      categories,
    },
  };
}
