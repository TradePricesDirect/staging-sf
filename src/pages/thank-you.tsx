import { getOrderDetails } from "utils/ssr";
import ThankYouPage from "views/ThankYou";

export default ThankYouPage;

export async function getServerSideProps({ query: { token } }) {
  if (!token) return { notFound: true };

  const order = await getOrderDetails(token);

  if (!order) return { notFound: true };

  return {
    props: { token, order },
  };
}
