import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { setAuthToken, useSetPassword } from "@saleor/sdk";
import { StringParam, useQueryParams } from "use-query-params";
import paths from "core/paths";
import Auth from "components/templates/Auth";
import ResetPasswordForm from "components/molecules/ResetPasswordForm";

const ResetPasswordPage = () => {
  const router = useRouter();

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const [setPassword, { data, error: graphqlErrors }] = useSetPassword();

  const [query] = useQueryParams({
    email: StringParam,
    token: StringParam,
  });

  useEffect(() => {
    const success = data && data.setPassword && data.setPassword.token;

    // Password changed
    if (success) {
      setAuthToken(data.setPassword.token);
      setSuccess(true);
    }

    // Error somewhere
    setError(graphqlErrors?.extraInfo?.userInputErrors[0] || null);
  }, [data, graphqlErrors]);

  const { email, token } = query;

  if (!email || !token) {
    router.push(paths.home);
    return null;
  }

  const handleSubmit = ({ password }) => {
    setPassword({ email, token, password });
  };

  if (success) return <ResetPasswordSuccess />;

  if (error?.field === "token") return <ResetPasswordExpired />;

  return (
    <Auth title="Reset Your Password">
      <p>Enter a new password for your account.</p>

      <ResetPasswordForm onSubmit={handleSubmit} error={error} />
    </Auth>
  );
};

export default ResetPasswordPage;

const ResetPasswordSuccess = () => {
  return (
    <Auth title="Password Updated">
      <p>Your password has been updated.</p>

      <Link href={paths.home} className="btn btn-primary w-50">
        Back to Home
      </Link>
    </Auth>
  );
};

const ResetPasswordExpired = () => {
  return (
    <Auth title="Reset Request Expired">
      <div className="alert alert-danger" role="alert">
        This password reset link has expired. Please request it again.
      </div>

      <Link href={paths.forgotPassword} className="btn btn-primary w-50">
        Forgot Password
      </Link>
    </Auth>
  );
};
