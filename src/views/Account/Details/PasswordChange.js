import { usePasswordChange } from "@saleor/sdk";
import { useForm } from "react-hook-form";
import { icons } from "core/constants";
import Alert from "components/atoms/Alert";
import Input from "components/atoms/Input";
import Button from "components/atoms/Button";

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

        <Button
          submit
          color={"secondary"}
          loading={isSubmitting}
          disabled={isSubmitting}
          label={`Save Changes`}
          icon={icons.faArrowRight}
        />

      </form>
    </>
  );
};

export default PasswordChange;
