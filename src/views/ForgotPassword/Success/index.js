import Link from "next/link";
import paths from "core/paths";
import Auth from "components/templates/Auth";

const ForgotPasswordSuccessPage = () => {
  return (
    <Auth title="Reset Email Sent">
      <p>
        In a few minutes you’ll receive a message with instructions on how to
        reset your password.
      </p>

      <Link href={paths.login}>
        <a className="btn btn-primary w-100">Back to Sign In</a>
      </Link>
    </Auth>
  );
};

export default ForgotPasswordSuccessPage;
