import { useState } from "react";
import { useCheckout } from "@saleor/sdk";
import Alert from "components/atoms/Alert";
import SubmitButton from "components/atoms/SubmitButton";

const DummyPaymentGateway = ({ id, onSubmitSuccess }) => {
  const { createPayment } = useCheckout();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    const { dataError } = await createPayment({
      gateway: id,
      token: "not-charged",
    });

    if (dataError?.error) {
      setLoading(false);
      setErrors(dataError.error);
    } else {
      onSubmitSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {errors?.map((error) => (
        <Alert type="danger">{error.message}</Alert>
      ))}

      <p>
        Place your order through the website and a Trade Prices Direct member of
        staff will be in touch within 24 hours to go through finance options and
        complete your order.
      </p>

      <SubmitButton loading={loading}>Pay By Finance</SubmitButton>
    </form>
  );
};

export default DummyPaymentGateway;
