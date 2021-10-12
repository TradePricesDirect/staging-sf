import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@saleor/sdk";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/pro-light-svg-icons";
import paths from "core/paths";
import Input from "components/atoms/Input";

const ResetPasswordRequestForm = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(null);

  const { resetPasswordRequest } = useAuth();

  const { register, handleSubmit, formState } = useForm();
  const { errors, isSubmitting, isSubmitSuccessful } = formState;

  const onSubmit = async ({ email }) => {
    try {
      setErrorMessage(null);

      const redirectUrl = `${location.origin}${paths.passwordReset}`;

      const { dataError } = await resetPasswordRequest(email, redirectUrl);

      if (dataError?.error) throw dataError.error[0];

      router.push(paths.forgotPasswordSuccess);
    } catch (error) {
      setErrorMessage(error.message);
      throw error;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {!!errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}

      <Input
        label="Email Address"
        name="email"
        type="email"
        autoComplete="email"
        register={register}
        validation={{ required: true }}
        error={errors.email}
        disabled={isSubmitting || isSubmitSuccessful}
      />

      <button
        type="submit"
        className="btn btn-primary w-100"
        disabled={isSubmitting || isSubmitSuccessful}
      >
        {isSubmitting || isSubmitSuccessful ? (
          <FontAwesomeIcon icon={faSpinner} spin />
        ) : (
          <span>Reset Password</span>
        )}
      </button>
    </form>
  );
};

export default ResetPasswordRequestForm;
