import { getTotalProducts, getCategoryLevels } from "utils/ssr";
import RequestQuoteThankYouPage from "views/RequestQuoteThankYou";

export default RequestQuoteThankYouPage;

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
