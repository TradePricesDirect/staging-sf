import { usePasswordChange } from "@saleor/sdk";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/pro-light-svg-icons";
import Input from "components/atoms/Input";

const PasswordChange = () => {
  const [setPasswordChange] = usePasswordChange();

  const { register, handleSubmit, formState } = useForm();
  const { errors, isSubmitting, isSubmitSuccessful } = formState;

  const onSubmit = (data) => setPasswordChange(data);

  return (
    <>
      {isSubmitSuccessful && (
        <div className="alert alert-success" role="alert">
          Password updated!
        </div>
      )}

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
          className="btn btn-primary"
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
