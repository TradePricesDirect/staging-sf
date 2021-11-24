import { getTotalProducts, getCategoriesByLevel } from "utils/ssr";
import HomePage from "views/Home";

export default HomePage;

export async function getStaticProps() {
  const categoriesLevel0 = await getCategoriesByLevel(0, 3);
  const categoriesLevel1 = await getCategoriesByLevel(1, 50);

  const totalCounts = await getTotalProducts();

  return {
    props: {
      categoriesLevel0,
      categoriesLevel1,
      totalCounts,
    },
  };
}
