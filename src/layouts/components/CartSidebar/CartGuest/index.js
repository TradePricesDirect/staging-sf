import paths from "core/paths";
import { faArrowRight } from "@fortawesome/pro-regular-svg-icons";
import Button from "components/atoms/Button";

const CartGuest = () => {
  return (
    <div className="d-grid">
      <div className="alert alert-primary" role="alert">
        Please sign in or register for an account.
      </div>

      <Button path={paths.login} label="Sign in or Create an Account" color="secondary" icon={faArrowRight} />
    </div>
  );
};

export default CartGuest;
