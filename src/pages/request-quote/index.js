import { getTotalProducts, getCategories, getFeaturedCategories } from "utils/ssr";
import RequestQuotePage from "views/RequestQuote";

export default RequestQuotePage;

export async function getStaticProps() {
  const totalCounts = await getTotalProducts();
  const categories = await getCategories();
  const featuredCategories = await getFeaturedCategories();

  return {
    props: {
      totalCounts,
      categories,
      featuredCategories
    },
  };
}
