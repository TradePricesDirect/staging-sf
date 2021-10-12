import { useRef } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/pro-light-svg-icons";
import Input from "components/atoms/Input";

const ResetPasswordForm = ({ onSubmit, error }) => {
  const { register, handleSubmit, formState, watch } = useForm();
  const { errors, isSubmitting } = formState;

  const password = useRef({});
  password.current = watch("password", "");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {!!error && (
        <div className="alert alert-danger" role="alert">
          {error.message}
        </div>
      )}

      <Input
        label="Password"
        name="password"
        type="password"
        register={register}
        validation={{
          required: true,
          minLength: {
            value: 8,
            message: "Password must have at least 8 characters",
          },
        }}
        error={errors.password}
      />

      <Input
        label="Repeat Password"
        name="password_repeat"
        type="password"
        register={register}
        validation={{
          validate: (value) =>
            value === password.current || "The passwords do not match",
        }}
        error={errors.password_repeat}
      />

      <button
        type="submit"
        className="btn btn-primary w-100"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <FontAwesomeIcon icon={faSpinner} spin />
        ) : (
          <span>Reset Password</span>
        )}
      </button>
    </form>
  );
};

export default ResetPasswordForm;
