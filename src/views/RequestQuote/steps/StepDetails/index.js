import { useAuth } from "@saleor/sdk";
import { useForm } from "react-hook-form";
import Input from "components/atoms/Input";
import Checkbox from "components/atoms/Checkbox";
import Button from "components/atoms/Button";

import styles from "../Steps.module.scss";
import { faArrowRight } from "@fortawesome/pro-regular-svg-icons";

export default function StepDetails({ onSubmit, handleBack }) {
  const { user } = useAuth();

  const { register, handleSubmit, watch, formState } = useForm({
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
    <>
      <header className={styles.headerContainer}>
        <div className="container">
          <div className="row">
            <div className="col-12 m-auto">
              <h2 className={styles.header}>Almost done, one last thing</h2>
              <h4 className={styles.subheader}>You&apos;re seconds away from trade prices on 1000&apos;s of brands, simply set up an account to start shopping</h4>
            </div>
          </div>
        </div>
      </header>
      <fieldset>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.formHeader}>
            <h5>About you</h5><button onClick={handleBack}>Back</button>
          </div>
          <div className={styles.formContent}>
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

            {!user && (
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
            )}

            <Checkbox
              label="I'm happy to be contacted regarding my enquiry & receive future
              offers from Trade Prices Direct."
              name="consent"
              register={register}
              validation={{ required: true }}
              error={errors.consent}
            />

              <Checkbox
                label={`I agree to the Trade Prices Direct <a href="/customer-account-terms-conditions" target="_blank">customer account terms & conditions</a>.`}
                name="terms"
                register={register}
                validation={{ required: true }}
                error={errors.terms}
              />


            <div className="d-flex justify-content-end">
              <Button submit loading={isSubmitting || isSubmitSuccessful} label="Register Now" color="secondary" icon={faArrowRight}/>
            </div>
          </div>
        </form>
      </fieldset>
    </>
  );
}
