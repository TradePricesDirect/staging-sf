import { useRouter } from "next/router";
import { useAuth, useCart, useCheckout } from "@saleor/sdk";
import paths from "core/paths";
import CheckoutLayout from "layouts/Checkout";
import Loader from "components/atoms/Loader";
import Page from "./Page";

const CheckoutPage = () => {
  const { push } = useRouter();

  const { user } = useAuth();
  const { loaded: cartLoaded } = useCart();
  const { loaded: checkoutLoaded } = useCheckout();

  // Handle exit redirecting
  if (!user) push(paths.home);

  // Loading or redirecting
  if (!user || !cartLoaded || !checkoutLoaded) return <Loader />;

  return <Page />;
};

CheckoutPage.getLayout = (page, _, footerMenus) => (
  <CheckoutLayout footerMenus={footerMenus}>{page}</CheckoutLayout>
);

export default CheckoutPage;
