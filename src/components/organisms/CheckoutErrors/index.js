import Alert from "components/atoms/Alert";

const CheckoutErrors = ({ errors }) => {
  if (!errors || !errors.length) return null;

  return errors?.map((error) => (
    <Alert key={error.code} type="danger">
      {error.message}
    </Alert>
  ));
};

export default CheckoutErrors;
