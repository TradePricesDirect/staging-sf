import { useAuth, useAccountUpdate } from "@saleor/sdk";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/pro-light-svg-icons";
import Input from "components/atoms/Input";

const PersonalDetails = () => {
  const { user } = useAuth();
  const [setAccountUpdate] = useAccountUpdate();

  const { register, handleSubmit, formState } = useForm();
  const { errors, isSubmitting, isSubmitSuccessful } = formState;

  const onSubmit = (data) => setAccountUpdate({ input: data });

  return (
    <>
      {isSubmitSuccessful && (
        <div className="alert alert-success" role="alert">
          Personal details updated!
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="First name"
          name="firstName"
          defaultValue={user.firstName || ""}
          register={register}
          validation={{ required: true }}
          error={errors.firstName}
        />

        <Input
          label="Last name"
          name="lastName"
          defaultValue={user.lastName || ""}
          register={register}
          validation={{ required: true }}
          error={errors.lastName}
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

export default PersonalDetails;
