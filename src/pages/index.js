import { getTotalProducts, getCategoryLevels } from "utils/ssr";
import HomePage from "views/Home";

export default HomePage;

export async function getStaticProps() {
  const totalCounts = await getTotalProducts();

  const categories = await getCategoryLevels(3, 50);

  return {
    props: {
      categories,
      totalCounts,
    },
  };
}
