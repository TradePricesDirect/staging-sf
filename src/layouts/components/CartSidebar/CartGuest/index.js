import Link from "next/link";
import paths from "core/paths";

const CartGuest = () => {
  return (
    <div className="d-grid">
      <div className="alert alert-primary" role="alert">
        Please sign in or register for an account.
      </div>

      <Link href={paths.login}>
        <a className="btn btn-primary">Sign in or Create an Account</a>
      </Link>
    </div>
  );
};

export default CartGuest;
