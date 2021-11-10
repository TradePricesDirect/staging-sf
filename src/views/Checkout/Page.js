import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useCart, useCheckout } from "@saleor/sdk";
import paths from "core/paths";
import { useOrderAddNoteMutation } from "graphql/mutations";
import useRedirectToCorrectCheckoutStep from "hooks/useRedirectToCorrectCheckoutStep";
import useLocalStorage from "hooks/useLocalStorage";
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

  const [metadata, setMetadata] = useLocalStorage("data_checkout_metadata");
  const [orderAddNote] = useOrderAddNoteMutation();

  const [paymentGatewayErrors, setPaymentGatewayErrors] = useState(null);

  /* Steps */
  const steps = getAvailableSteps(items);
  const activeStep = getStepByPathname(pathname, steps);

  /* Event Handlers */

  // Progress to next step route
  const handleStepSubmitSuccess = async (stepIndex, order) => {
    const activeStepIndex = stepIndex || activeStep.index;

    if (activeStepIndex === CheckoutStepEnum.Review) {
      // Pass metadata to order
      if (metadata) {
        for (const [key, value] of Object.entries(metadata)) {
          await orderAddNote({
            variables: { id: order.id, message: `${key} - ${value}` },
          });
        }
        setMetadata({});
      }

      push(
        { pathname: paths.orderThankYou, query: { token: order.token } },
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
      setPaymentGatewayErrors(dataError.error);
      push(paths.checkoutReview);
    } else {
      handleStepSubmitSuccess(CheckoutStepEnum.Review, data?.order);
    }
  };

  // When a payment gateway navigates externally and then returns back
  const handlePaymentConfirm = async () => {
    if (payment?.gateway === PaymentGatewayEnum.Stripe) {
      if (query.redirect_status === "failed") {
        setPaymentGatewayErrors([
          {
            code: "PAYMENT_FAILED",
            message: "Unable to process payment. Please try again.",
          },
        ]);
        push(paths.checkoutReview);
      } else {
        await handleSubmitPaymentSuccess();
      }
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
            errors={paymentGatewayErrors}
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
