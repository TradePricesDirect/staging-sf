import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@saleor/sdk";
import { useForm } from "react-hook-form";
import Button from "components/atoms/Button";
import paths from "core/paths";
import Input from "components/atoms/Input";
import { faArrowRight } from "@fortawesome/pro-light-svg-icons";

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

      <Button submit label="Reset Password" color="secondary" icon={icons.faArrowRight} disabled={isSubmitting || isSubmitSuccessful} loading={isSubmitting || isSubmitSuccessful} />

    </form>
  );
};

export default ResetPasswordRequestForm;
