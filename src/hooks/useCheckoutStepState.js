import { useEffect, useState } from "react";
import { useCart, useCheckout } from "@saleor/sdk";
import {
  CheckoutStepEnum,
  checkIfShippingRequiredForProducts,
} from "views/Checkout/utils";
import { isPriceEqual } from "utils/money";

const useCheckoutStepState = () => {
  const { items, totalPrice } = useCart();
  const { checkout, payment } = useCheckout();

  const isShippingRequiredForProducts =
    checkIfShippingRequiredForProducts(items);

  const isCheckoutPriceEqualPaymentPrice =
    payment?.total &&
    totalPrice?.gross &&
    isPriceEqual(payment.total, totalPrice.gross);

  // Get the max possible step based upon checkout state
  const getMaxPossibleStep = () => {
    // we are creating checkout during address set up
    if (!checkout?.id && items) return CheckoutStepEnum.Address;

    const isShippingAddressSet =
      !isShippingRequiredForProducts || !!checkout?.shippingAddress;

    const isBillingAddressSet = !!checkout?.billingAddress;

    const isShippingMethodSet =
      !isShippingRequiredForProducts || !!checkout?.shippingMethod;

    const isPaymentMethodSet =
      !!payment?.id && isCheckoutPriceEqualPaymentPrice;

    // Are shipping and billing addresses set
    if (!isShippingAddressSet || !isBillingAddressSet) {
      return CheckoutStepEnum.Address;
    }

    // Is shipping method set
    if (!isShippingMethodSet) {
      return CheckoutStepEnum.Shipping;
    }

    if (!isPaymentMethodSet) {
      return CheckoutStepEnum.Payment;
    }

    return CheckoutStepEnum.Review;
  };

  // Get the recommended step based upon checkout state
  const getRecommendedStep = (newMaxPossibleStep) => {
    const isPaymentRecreateRequired =
      newMaxPossibleStep > CheckoutStepEnum.Shipping &&
      !isCheckoutPriceEqualPaymentPrice;

    if (isPaymentRecreateRequired && isShippingRequiredForProducts) {
      return CheckoutStepEnum.Shipping;
    }

    if (isPaymentRecreateRequired) return CheckoutStepEnum.Payment;

    return newMaxPossibleStep;
  };

  const [maxPossibleStep, setMaxPossibleStep] = useState(getMaxPossibleStep());

  const [recommendedStep, setRecommendedStep] = useState(
    getRecommendedStep(maxPossibleStep)
  );

  useEffect(() => {
    const newMaxPossibleStep = getMaxPossibleStep();
    const newRecommendedStep = getRecommendedStep(newMaxPossibleStep);

    if (maxPossibleStep !== newMaxPossibleStep) {
      setMaxPossibleStep(newMaxPossibleStep);
    }

    if (recommendedStep !== newRecommendedStep) {
      setRecommendedStep(newRecommendedStep);
    }
  }, [checkout, items, payment, totalPrice]);

  return { recommendedStep, maxPossibleStep };
};

export default useCheckoutStepState;
