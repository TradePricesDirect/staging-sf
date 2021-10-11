import { getTotalProducts } from "utils/ssr";
import HomePage from "views/Home";

export default HomePage;

export async function getStaticProps() {
  const totalCounts = await getTotalProducts();

  return {
    props: {
      totalCounts,
    },
  };
}
