import paths from "core/paths";

export const CheckoutStepEnum = {
  Address: 1,
  Shipping: 2,
  Payment: 3,
  Review: 4,
  PaymentConfirm: 5,
};

export const CHECKOUT_STEPS = [
  {
    index: CheckoutStepEnum.Address,
    name: "Address",
    link: paths.checkoutAddress,
    onlyIfShippingRequired: false,
  },
  {
    index: CheckoutStepEnum.Shipping,
    name: "Delivery",
    link: paths.checkoutShipping,
    onlyIfShippingRequired: true,
  },
  {
    index: CheckoutStepEnum.Payment,
    name: "Payment",
    link: paths.checkoutPayment,
    onlyIfShippingRequired: false,
  },
  {
    index: CheckoutStepEnum.Review,
    name: "Review",
    link: paths.checkoutReview,
    onlyIfShippingRequired: false,
  },
  {
    index: CheckoutStepEnum.PaymentConfirm,
    name: "Payment Confirm",
    link: paths.checkoutPaymentConfirm,
    onlyIfShippingRequired: false,
    withoutOwnView: true,
  },
];

// Check if at least one cart item requires shipping
export const checkIfShippingRequiredForProducts = (items) => {
  return items?.some((item) => {
    return item.variant.product?.productType.isShippingRequired;
  });
};

// Get available checkout steps based upon cart items
export const getAvailableSteps = (items) => {
  const isShippingRequired = checkIfShippingRequiredForProducts(items);

  const stepsWithViews = CHECKOUT_STEPS.filter((step) => !step.withoutOwnView);

  return isShippingRequired
    ? stepsWithViews
    : stepsWithViews.filter((step) => !step.onlyIfShippingRequired);
};

// Get currently active checkout step
export const getStepByPathname = (pathname, steps) => {
  return steps.find(({ link }) => link === pathname);
};

export const stepSubmitSuccessHandler = (push, steps, activeStepIndex) => {
  return (currentStep, data) => {
    if (currentStep === "REVIEW") {
      push({ pathname: paths.orderThankYou, query: data });
    } else {
      push(steps[activeStepIndex + 1].link);
    }
  };
};
