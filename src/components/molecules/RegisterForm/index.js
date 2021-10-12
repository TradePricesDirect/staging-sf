import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/pro-light-svg-icons";
import Input from "components/atoms/Input";
import { useRegisterAccount } from "./queries";

const RegisterForm = () => {
  const { registerAccount, errorMessage } = useRegisterAccount();

  const { register, handleSubmit, formState } = useForm();
  const { errors, isSubmitting } = formState;

  return (
    <form onSubmit={handleSubmit(registerAccount)}>
      {!!errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}

      <div className="row gx-4">
        <div className="col-sm">
          <Input
            label="First Name"
            name="firstName"
            autoComplete="given-name"
            register={register}
            validation={{ required: true }}
            error={errors.firstName}
          />
        </div>
        <div className="col-sm">
          <Input
            label="Last Name"
            name="lastName"
            autoComplete="family-name"
            register={register}
            validation={{ required: true }}
            error={errors.lastName}
          />
        </div>
      </div>

      <Input
        label="Email Address"
        name="email"
        type="email"
        autoComplete="email"
        register={register}
        validation={{ required: true }}
        error={errors.email}
      />

      <Input
        label="Password"
        name="password"
        type="password"
        autoComplete="password"
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

      <button
        type="submit"
        className="btn btn-primary w-100"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <FontAwesomeIcon icon={faSpinner} spin />
        ) : (
          <span>Create Account</span>
        )}
      </button>
    </form>
  );
};

export default RegisterForm;
