import { useEffect, useState } from "react";
import { useCheckout } from "@saleor/sdk";
import SubmitButton from "components/atoms/SubmitButton";
import ShippingOption from "./ShippingOption";

import styles from "./CheckoutShipping.module.scss";

export const CheckoutShipping = ({ onSubmitSuccess }) => {
  const { checkout, availableShippingMethods, setShippingMethod } =
    useCheckout();

  const [state, setState] = useState({
    loading: false,
    error: null,
    shippingMethod: checkout?.shippingMethod?.id,
  });

  // Set default if only one available
  useEffect(() => {
    if (availableShippingMethods.length === 1 && !state.shippingMethod) {
      setState({ ...state, shippingMethod: availableShippingMethods[0].id });
    }
  }, [availableShippingMethods]);

  const shippingMethods = availableShippingMethods || [];

  const handleChange = (id) => setState({ ...state, shippingMethod: id });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { loading, shippingMethod } = state;

      if (loading) return;

      // Loading
      setState({ ...state, loading: true });

      // Set Shipping Method
      const { dataError } = await setShippingMethod(shippingMethod);

      if (dataError?.error) throw dataError.error[0];

      onSubmitSuccess();
    } catch (error) {
      console.error(error);
      setState({ ...state, loading: false, error: error });
    }
  };

  const canSubmit = !!state.shippingMethod;

  return (
    <>
      <h2 className={styles.title}>Shipping Method</h2>

      <form onSubmit={handleSubmit}>
        {shippingMethods.map((shippingMethod) => (
          <ShippingOption
            key={`shipping-${shippingMethod.id}`}
            shippingMethod={shippingMethod}
            onChange={() => handleChange(shippingMethod.id)}
            selected={state.shippingMethod === shippingMethod.id}
          />
        ))}

        {canSubmit && (
          <SubmitButton loading={state.loading}>Continue</SubmitButton>
        )}
      </form>
    </>
  );
};
