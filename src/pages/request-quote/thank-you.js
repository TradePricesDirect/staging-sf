import { getTotalProducts, getCategoriesByLevel } from "utils/ssr";
import RequestQuoteThankYouPage from "views/RequestQuoteThankYou";

export default RequestQuoteThankYouPage;

export async function getStaticProps() {
  const totalCounts = await getTotalProducts();

  const categoriesLevel0 = await getCategoriesByLevel(0, 3);
  const categoriesLevel1 = await getCategoriesByLevel(1, 50);

  return {
    props: {
      totalCounts,
      categoriesLevel0,
      categoriesLevel1,
    },
  };
}
