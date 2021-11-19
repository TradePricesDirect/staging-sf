import { usePasswordChange } from "@saleor/sdk";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/pro-light-svg-icons";
import Alert from "components/atoms/Alert";
import Input from "components/atoms/Input";

const PasswordChange = () => {
  const [setPasswordChange, { data, error }] = usePasswordChange();

  const { register, handleSubmit, formState } = useForm();
  const { errors, isSubmitting } = formState;

  const onSubmit = (data) => setPasswordChange(data);

  const isSubmitSuccessful = data && !error;

  const formErrors = error?.extraInfo?.userInputErrors || [];

  return (
    <>
      {formErrors?.map((error) => (
        <Alert key={error.code} type="danger">
          {error.message}
        </Alert>
      ))}

      {isSubmitSuccessful && <Alert type="success">Password updated!</Alert>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Old Password"
          name="oldPassword"
          type="password"
          register={register}
          validation={{ required: true }}
          error={errors.oldPassword}
        />

        <Input
          label="New Password"
          name="newPassword"
          type="password"
          register={register}
          validation={{
            required: true,
            minLength: {
              value: 8,
              message: "Password must have at least 8 characters",
            },
          }}
          error={errors.newPassword}
        />

        <button
          type="submit"
          className="btn btn-outline-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <FontAwesomeIcon icon={faSpinner} spin />
          ) : (
            <span>Save changes</span>
          )}
        </button>
      </form>
    </>
  );
};

export default PasswordChange;
