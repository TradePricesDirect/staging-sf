import { useCheckout } from "@saleor/sdk";

export const CheckoutPayment = () => {
  const { availablePaymentGateways } = useCheckout();

  console.log(availablePaymentGateways);

  return (
    <div>
      <h2>Payment Options</h2>
    </div>
  );
};

/*
  const handleProcessPayment = async (
    gateway: string,
    token?: string,
    cardData?: ICardData
  ) => {
    const paymentConfirmStepLink = CHECKOUT_STEPS.find(
      (step) => step.step === CheckoutStep.PaymentConfirm
    )?.link;
    const { dataError } = await createPayment({
      gateway,
      token,
      creditCard: cardData,
      returnUrl: `${window.location.origin}${paymentConfirmStepLink}`,
    });
    const errors = dataError?.error;
    setSubmitInProgress(false);
    if (errors) {
      setPaymentGatewayErrors(errors);
    } else {
      setPaymentGatewayErrors([]);
      handleStepSubmitSuccess(CheckoutStep.Payment);
    }
  };

  const handleSubmitPayment = async (paymentData?: object) => {
    const response = await completeCheckout({ paymentData });
    return {
      confirmationData: response.data?.confirmationData,
      confirmationNeeded: response.data?.confirmationNeeded,
      order: response.data?.order,
      errors: response.dataError?.error,
    } as IPaymentSubmitResult;
  };

  const handleSubmitPaymentSuccess = (
    order?: CompleteCheckout_checkoutComplete_order | null
  ) => {
    setSubmitInProgress(false);
    setPaymentGatewayErrors([]);
    handleStepSubmitSuccess(CheckoutStep.Review, {
      id: order?.id,
      orderNumber: order?.number,
      token: order?.token,
    });
  };

  const handlePaymentGatewayError = (errors: IFormError[]) => {
    setSubmitInProgress(false);
    setPaymentGatewayErrors(errors);
    const paymentStepLink = steps.find(
      (step) => step.step === CheckoutStep.Payment
    )?.link;
    if (paymentStepLink) {
      push(paymentStepLink);
    }
  };

  const paymentGateways = availablePaymentGateways && (
    <PaymentGatewaysList
      paymentGateways={availablePaymentGateways}
      processPayment={handleProcessPayment}
      submitPayment={handleSubmitPayment}
      submitPaymentSuccess={handleSubmitPaymentSuccess}
      formId={CHECKOUT_GETEWAY_FORM_ID}
      formRef={checkoutGatewayFormRef}
      selectedPaymentGateway={selectedPaymentGateway}
      selectedPaymentGatewayToken={selectedPaymentGatewayToken}
      selectPaymentGateway={setSelectedPaymentGateway}
      onError={handlePaymentGatewayError}
      errors={paymentGatewayErrors}
    />
  );
*/
