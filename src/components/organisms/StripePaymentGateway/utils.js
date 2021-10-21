export const parsePaymentConfirmationData = (confirmationData) => {
  try {
    const paymentAction = JSON.parse(confirmationData);

    return { paymentAction };
  } catch (parseError) {
    return { parseError };
  }
};

export const STRIPE_APPEARANCE = {
  theme: "stripe",
  variables: {
    colorPrimary: "#03284c",
    colorBackground: "#ffffff",
    colorText: "#222321",
    colorDanger: "#ef4444",
    fontFamily: "soleil, sans-serif",
  },
};
