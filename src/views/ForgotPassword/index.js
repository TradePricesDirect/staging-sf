import Auth from "components/templates/Auth";
import ResetPasswordRequestForm from "components/molecules/ResetPasswordRequestForm";

const ForgotPasswordPage = () => {
  return (
    <Auth title="Forgot Password?">
      <p>
        Enter the email address associated with your account and we will send
        you a link to reset your password.
      </p>

      <ResetPasswordRequestForm />
    </Auth>
  );
};

export default ForgotPasswordPage;
