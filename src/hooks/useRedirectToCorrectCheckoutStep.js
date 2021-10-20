import { useEffect } from "react";
import { useRouter } from "next/router";
import { useCart, useCheckout } from "@saleor/sdk";
import {
  CHECKOUT_STEPS,
  checkIfShippingRequiredForProducts,
} from "views/Checkout/utils";
import useCheckoutStepState from "./useCheckoutStepState";

const useRedirectToCorrectCheckoutStep = (cartLoaded) => {
  const { pathname, replace } = useRouter();
  const { totalPrice, items } = useCart();
  const { checkout, payment } = useCheckout();
  const { recommendedStep, maxPossibleStep } = useCheckoutStepState(
    items,
    checkout,
    payment,
    totalPrice
  );

  useEffect(() => {
    // Current step
    const stepFromPath = CHECKOUT_STEPS.find(
      ({ link }) => link === pathname
    )?.step;

    const isShippingRequired = checkIfShippingRequiredForProducts(items);

    // Are we on the wrong step for checkout session
    const isIncorrectStep =
      !stepFromPath ||
      stepFromPath > maxPossibleStep ||
      (pathname === CHECKOUT_STEPS[1].link && !isShippingRequired);

    // Get the recommended step, or first
    const getStepLink = () =>
      CHECKOUT_STEPS.find((stepObj) => stepObj.step === recommendedStep)
        ?.link || CHECKOUT_STEPS[0].link;

    // If incorrect, replace
    if (cartLoaded && isIncorrectStep) replace(getStepLink());
  }, [pathname, cartLoaded]);
};

export default useRedirectToCorrectCheckoutStep;
