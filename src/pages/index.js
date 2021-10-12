import { getTotalProducts, getCategoryLevels } from "utils/ssr";
import HomePage from "views/Home";

export default HomePage;

export async function getStaticProps() {
  const totalCounts = await getTotalProducts();

  const categories = await getCategoryLevels();

  return {
    props: {
      categories,
      totalCounts,
    },
  };
}
