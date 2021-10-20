import { useEffect, useState } from "react";
import { checkIfShippingRequiredForProducts } from "views/Checkout/utils";
import { isPriceEqual } from "utils/money";

export const CheckoutStep = {
  ADDRESS: 1,
  SHIPPING: 2,
  PAYMENT: 3,
  REVIEW: 4,
  PAYMENT_CONFIRM: 4,
};

const useCheckoutStepState = (items, checkout, payment, totalPrice) => {
  const isShippingRequiredForProducts =
    checkIfShippingRequiredForProducts(items);

  const isCheckoutPriceEqualPaymentPrice =
    payment?.total &&
    totalPrice?.gross &&
    isPriceEqual(payment.total, totalPrice.gross);

  // Get the max possible step based upon checkout state
  const getMaxPossibleStep = () => {
    // we are creating checkout during address set up
    if (!checkout?.id && items) return "ADDRESS";

    const isShippingAddressSet =
      !isShippingRequiredForProducts || !!checkout?.shippingAddress;

    const isBillingAddressSet = !!checkout?.billingAddress;

    const isShippingMethodSet =
      !isShippingRequiredForProducts || !!checkout?.shippingMethod;

    const isPaymentMethodSet =
      !!payment?.id && isCheckoutPriceEqualPaymentPrice;

    if (!isShippingAddressSet || !isBillingAddressSet) return "ADDRESS";

    if (!isShippingMethodSet) return "SHIPPING";

    if (!isPaymentMethodSet) return "PAYMENT";

    return "REVIEW";
  };

  // Get the recommended step based upon checkout state
  const getRecommendedStep = (newMaxPossibleStep) => {
    const isPaymentRecreateRequired =
      CheckoutStep[newMaxPossibleStep] > CheckoutStep["SHIPPING"] &&
      !isCheckoutPriceEqualPaymentPrice;

    if (isPaymentRecreateRequired && isShippingRequiredForProducts) {
      return "SHIPPING";
    }

    if (isPaymentRecreateRequired) return "PAYMENT";

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
