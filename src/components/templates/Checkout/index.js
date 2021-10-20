import CheckoutCartSummary from "components/molecules/CheckoutCartSummary";

const Checkout = ({ navigation, step }) => {
  return (
    <div className="container py-8">
      <div className="row">
        <div className="col-12 col-md-7 col-lg-8">
          {navigation}
          {step}
        </div>
        <div className="col-12 col-md-5 col-lg-4">
          <CheckoutCartSummary />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
