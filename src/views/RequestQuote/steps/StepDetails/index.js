import { useAuth } from "@saleor/sdk";
import { useForm } from "react-hook-form";
import Input from "components/atoms/Input";
import Checkbox from "components/atoms/Checkbox";
import SubmitButton from "components/atoms/SubmitButton";

import styles from "../Steps.module.scss";

export default function StepDetails({ onSubmit }) {
  const { user } = useAuth();

  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      consent: false,
    },
  });
  const { errors, isSubmitting, isSubmitSuccessful } = formState;

  return (
    <fieldset>
      <legend className={styles.title}>
        You're at the finish line, register now & <strong>start saving</strong>
        ...
      </legend>

      <p className={styles.lead}>
        This is it - one more step and you'll get access to 1000's of top brands
        at rock bottom prices.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className="row gx-4">
          <div className="col-sm">
            <Input
              label="First name"
              name="firstName"
              register={register}
              validation={{ required: true }}
              error={errors.firstName}
            />
          </div>

          <div className="col-sm">
            <Input
              label="Last name"
              name="lastName"
              register={register}
              validation={{ required: true }}
              error={errors.lastName}
            />
          </div>
        </div>

        <Input
          type="email"
          label="Email Address"
          name="email"
          register={register}
          validation={{ required: true }}
          error={errors.email}
        />

        <Input
          type="tel"
          label="Phone Number"
          name="phone"
          register={register}
          validation={{ required: true }}
          error={errors.phone}
        />

        <Checkbox
          label="I'm happy to be contacted regarding my enquiry & receive future
              offers from Trade Prices Direct."
          name="consent"
          register={register}
          validation={{ required: true }}
          error={errors.consent}
        />

        <div className="d-grid">
          <SubmitButton loading={isSubmitting || isSubmitSuccessful}>
            Submit
          </SubmitButton>
        </div>
      </form>
    </fieldset>
  );
}
