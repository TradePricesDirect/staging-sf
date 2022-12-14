import Link from "next/link";
import paths from "core/paths";

const CartGuest = () => {
  return (
    <div className="d-grid">
      <div className="alert alert-primary" role="alert">
        Please sign in or register for an account.
      </div>

      <Link href={paths.login} className="btn btn-primary">
        Sign in or Create an Account
      </Link>
    </div>
  );
};

export default CartGuest;
