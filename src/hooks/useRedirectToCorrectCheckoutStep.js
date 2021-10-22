import { useEffect } from "react";
import { useRouter } from "next/router";
import { useCart } from "@saleor/sdk";
import paths from "core/paths";
import useCheckoutStepState from "hooks/useCheckoutStepState";
import {
  checkIfShippingRequiredForProducts,
  CheckoutStepEnum,
  CHECKOUT_STEPS,
} from "views/Checkout/utils";

const useRedirectToCorrectCheckoutStep = () => {
  const { items } = useCart();

  const { pathname, replace } = useRouter();

  const { recommendedStep, maxPossibleStep } = useCheckoutStepState();

  // Make sure we're on the right step for checkout session
  useEffect(() => {
    // Cart is empty
    if (!items?.length) {
      replace(paths.basket);
      return;
    }

    // If on payment confirm, don't redirect in this hook
    if (pathname === paths.checkoutPaymentConfirm) return;

    // Calculate checkout step
    const step = CHECKOUT_STEPS.find(({ link }) => link === pathname)?.index;

    if (!step) {
      replace(paths.checkoutAddress);
      return;
    }

    const isShippingRequired = checkIfShippingRequiredForProducts(items);

    const isIncorrectStep =
      !step ||
      step > maxPossibleStep ||
      (step === CheckoutStepEnum.Shipping && !isShippingRequired);

    if (isIncorrectStep) {
      const correctStep = CHECKOUT_STEPS.find(
        ({ index }) => index === recommendedStep
      );
      replace(correctStep.link);
    }
  }, [pathname]);
};

export default useRedirectToCorrectCheckoutStep;
