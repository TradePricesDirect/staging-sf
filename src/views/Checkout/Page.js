import { useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/router";
import { useCart, useCheckout } from "@saleor/sdk";
import paths from "core/paths";
import useRedirectToCorrectCheckoutStep from "hooks/useRedirectToCorrectCheckoutStep";
import Loader from "components/atoms/Loader";
import CheckoutProgressBar from "components/molecules/CheckoutProgressBar";
import CheckoutCartSummary from "components/molecules/CheckoutCartSummary";
import {
  CheckoutStepEnum,
  getAvailableSteps,
  getStepByPathname,
} from "./utils";
import {
  CheckoutAddress,
  CheckoutPayment,
  CheckoutReview,
  CheckoutShipping,
} from "./steps";
import { paymentGatewayNames } from "core/constants";

const Page = () => {
  useRedirectToCorrectCheckoutStep();

  /* Hooks */
  const { pathname, push, query } = useRouter();
  const { items } = useCart();
  const { payment, completeCheckout } = useCheckout();

  const checkoutGatewayFormRef = useRef(null);

  /* Steps */
  const steps = getAvailableSteps(items);
  const activeStep = getStepByPathname(pathname, steps);

  /* Event Handlers */

  // Progress to next step route
  const handleStepSubmitSuccess = (token) => {
    if (activeStep.index === CheckoutStepEnum.Review) {
      push(
        { pathname: paths.orderThankYou, query: { token } },
        paths.orderThankYou
      );
    } else {
      const nextStep = steps.find(
        ({ index }) => index === activeStep.index + 1
      );
      push(nextStep.link);
    }
  };

  // When a payment gateway navigates externally and then returns back
  const handlePaymentConfirm = async () => {
    console.log("Payment: ", payment);

    if (payment?.gateway === paymentGatewayNames.stripe) {
      console.log("Stripe Response query: ", query);

      const { data, dataError } = await completeCheckout();

      console.log(data);
      console.log(dataError);

      // handleStepSubmitSuccess(data.order.token);
    } else {
      console.log("SHOULD NOT BE HERE");
      // push(paths.checkoutPayment);
    }
  };

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
        return (
          <CheckoutPayment
            onSubmitSuccess={handleStepSubmitSuccess}
            paymentGatewayFormRef={checkoutGatewayFormRef}
          />
        );
      case CheckoutStepEnum.Review:
        return (
          <CheckoutReview
            onSubmitSuccess={handleStepSubmitSuccess}
            paymentGatewayFormRef={checkoutGatewayFormRef}
          />
        );
      default:
        return null;
    }
  }, [activeStep]);

  if (!activeStep || !items?.length) return <Loader />;

  return (
    <div className="container py-8">
      <div className="row">
        <div className="col-12 col-md-7 col-lg-8">
          <CheckoutProgressBar steps={steps} activeStep={activeStep} />

          {CheckoutStep}
        </div>
        <div className="col-12 col-md-5 col-lg-4">
          <CheckoutCartSummary />
        </div>
      </div>
    </div>
  );
};

export default Page;
