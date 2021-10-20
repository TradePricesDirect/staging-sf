import paths from "core/paths";

export const CHECKOUT_STEPS = [
  {
    index: 0,
    name: "Address",
    link: paths.checkoutAddress,
    step: "ADDRESS",
    onlyIfShippingRequired: false,
  },
  {
    index: 1,
    name: "Delivery",
    link: paths.checkoutShipping,
    step: "SHIPPING",
    onlyIfShippingRequired: true,
  },
  {
    index: 2,
    name: "Payment",
    link: paths.checkoutPayment,
    step: "PAYMENT",
    onlyIfShippingRequired: false,
  },
  {
    index: 3,
    name: "Review",
    link: paths.checkoutReview,
    step: "REVIEW",
    onlyIfShippingRequired: false,
  },
  {
    index: 4,
    name: "Payment Confirm",
    link: paths.checkoutPaymentConfirm,
    step: "PAYMENT_CONFIRM",
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
export const getCurrentStep = (pathname, steps) => {
  let activeStepIndex = steps.findIndex(({ link }) => link === pathname);
  activeStepIndex = activeStepIndex !== -1 ? activeStepIndex : 0;

  const activeStep = steps[activeStepIndex];

  return { activeStepIndex, activeStep };
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
