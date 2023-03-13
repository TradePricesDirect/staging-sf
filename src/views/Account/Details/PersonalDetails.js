import { useAuth, useAccountUpdate } from "@saleor/sdk";
import { useForm } from "react-hook-form";

import { icons } from "core/constants";
import Input from "components/atoms/Input";
import Button from "components/atoms/Button";

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

export default PersonalDetails;
