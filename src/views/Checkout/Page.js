import { useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { useCart, useCheckout } from "@saleor/sdk";
import paths from "core/paths";
import useRedirectToCorrectCheckoutStep from "hooks/useRedirectToCorrectCheckoutStep";
import Loader from "components/atoms/Loader";
import CheckoutProgressBar from "components/molecules/CheckoutProgressBar";
import Checkout from "components/templates/Checkout";
import {
  CheckoutStepEnum,
  getAvailableSteps,
  getStepByPathname,
  PaymentGatewayEnum,
} from "./utils";
import {
  CheckoutAddress,
  CheckoutPayment,
  CheckoutReview,
  CheckoutShipping,
} from "./steps";

const Page = () => {
  useRedirectToCorrectCheckoutStep();

  /* Hooks */
  const { pathname, push, query } = useRouter();
  const { items } = useCart();
  const { payment, completeCheckout } = useCheckout();

  /* Steps */
  const steps = getAvailableSteps(items);
  const activeStep = getStepByPathname(pathname, steps);

  /* Event Handlers */

  // Progress to next step route
  const handleStepSubmitSuccess = (token, stepIndex) => {
    const activeStepIndex = stepIndex || activeStep.index;

    if (activeStepIndex === CheckoutStepEnum.Review) {
      push(
        { pathname: paths.orderThankYou, query: { token } },
        paths.orderThankYou
      );
    } else {
      const nextStep = steps.find(({ index }) => index === activeStepIndex + 1);
      push(nextStep.link);
    }
  };

  const handleSubmitPaymentSuccess = async () => {
    const { data, dataError } = await completeCheckout();

    // We shouldn't hit errors here, but console logging just in case
    if (dataError?.error) {
      console.error("Error on handlePaymentConfirm for Stripe");
      console.trace();
    }

    handleStepSubmitSuccess(data.order.token, CheckoutStepEnum.Review);
  };

  // When a payment gateway navigates externally and then returns back
  const handlePaymentConfirm = async () => {
    if (payment?.gateway === PaymentGatewayEnum.Stripe) {
      await handleSubmitPaymentSuccess();
    }
  };

  // Handle payment confirmation returnURL
  useEffect(() => {
    if (pathname === paths.checkoutPaymentConfirm) {
      handlePaymentConfirm();
    }
  }, [pathname, query]);

  /* Current Step */
  const CheckoutStep = useMemo(() => {
    switch (activeStep?.index) {
      case CheckoutStepEnum.Address:
        return <CheckoutAddress onSubmitSuccess={handleStepSubmitSuccess} />;
      case CheckoutStepEnum.Shipping:
        return <CheckoutShipping onSubmitSuccess={handleStepSubmitSuccess} />;
      case CheckoutStepEnum.Payment:
        return <CheckoutPayment onSubmitSuccess={handleStepSubmitSuccess} />;
      case CheckoutStepEnum.Review:
        return (
          <CheckoutReview
            onSubmitSuccess={handleStepSubmitSuccess}
            onSubmitPaymentSuccess={handleSubmitPaymentSuccess}
          />
        );
      default:
        return null;
    }
  }, [activeStep]);

  if (!activeStep || !items?.length) return <Loader />;

  return (
    <Checkout>
      <CheckoutProgressBar steps={steps} activeStep={activeStep} />

      {CheckoutStep}
    </Checkout>
  );
};

export default Page;
