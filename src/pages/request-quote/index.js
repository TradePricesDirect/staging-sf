import { getTotalProducts } from "utils/ssr";
import RequestQuotePage from "views/RequestQuote";

export default RequestQuotePage;

export async function getStaticProps() {
  const totalCounts = await getTotalProducts();

  return {
    props: {
      totalCounts,
    },
  };
}
