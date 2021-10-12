import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@saleor/sdk";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/pro-light-svg-icons";
import Input from "components/atoms/Input";

const LoginForm = () => {
  const router = useRouter();
  const { signIn } = useAuth();

  const [errorMessage, setErrorMessage] = useState(null);
  const { register, handleSubmit, formState } = useForm();
  const { errors, isSubmitting } = formState;

  const onSubmit = async (formData) => {
    try {
      const { email, password } = formData;

      const { dataError } = await signIn(email, password);

      if (dataError?.error) throw dataError.error[0];

      router.push("/account");
    } catch (error) {
      switch (error.code) {
        case "INVALID_CREDENTIALS":
          setErrorMessage("The email or password you entered is incorrect.");
          break;
        default:
          setErrorMessage(error.message);
          break;
      }
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
      />

      <Input
        label="Password"
        name="password"
        type="password"
        autoComplete="password"
        register={register}
        validation={{ required: true }}
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
          <span>Sign In</span>
        )}
      </button>
    </form>
  );
};

export default LoginForm;
