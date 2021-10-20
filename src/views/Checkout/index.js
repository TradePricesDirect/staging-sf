import { useMemo } from "react";
import { useRouter } from "next/router";
import { useAuth, useCart, useCheckout } from "@saleor/sdk";
import paths from "core/paths";
import useRedirectToCorrectCheckoutStep from "hooks/useRedirectToCorrectCheckoutStep";
import CheckoutLayout from "layouts/Checkout";
import Loader from "components/atoms/Loader";
import CheckoutProgressBar from "components/molecules/CheckoutProgressBar";
import Checkout from "components/templates/Checkout";
import {
  CheckoutAddress,
  CheckoutPayment,
  CheckoutReview,
  CheckoutShipping,
} from "./steps";
import {
  getAvailableSteps,
  getCurrentStep,
  stepSubmitSuccessHandler,
} from "./utils";

const CheckoutPage = () => {
  const { pathname, push } = useRouter();

  const { user } = useAuth();
  const { loaded: cartLoaded, items } = useCart();
  const { loaded: checkoutLoaded, checkout } = useCheckout();

  useRedirectToCorrectCheckoutStep(cartLoaded);

  console.log("Checkout: ", checkout);

  const steps = getAvailableSteps(items);
  const { activeStepIndex, activeStep } = getCurrentStep(pathname, steps);

  const handleStepSuccess = stepSubmitSuccessHandler(
    push,
    steps,
    activeStepIndex
  );

  const checkoutStep = useMemo(() => {
    switch (activeStep.step) {
      case "ADDRESS":
        return <CheckoutAddress onSubmitSuccess={handleStepSuccess} />;
      case "SHIPPING":
        return <CheckoutShipping />;
      case "PAYMENT":
        return <CheckoutPayment />;
      case "REVIEW":
        return <CheckoutReview />;
      default:
        console.error("We should not be here...");
        return "NO STEP...";
    }
  }, [activeStep.step]);

  const noCartItems = cartLoaded && !items?.length;

  // Handle redirecting
  if (!user) push(paths.home);
  else if (noCartItems) push(paths.basket);

  // Loading
  if (!user || !cartLoaded || !checkoutLoaded || noCartItems) return <Loader />;

  return (
    <Checkout
      navigation={
        <CheckoutProgressBar steps={steps} activeStepIndex={activeStepIndex} />
      }
      step={checkoutStep}
    />
  );
};

CheckoutPage.getLayout = (page, _, footerMenus) => (
  <CheckoutLayout footerMenus={footerMenus}>{page}</CheckoutLayout>
);

export default CheckoutPage;
