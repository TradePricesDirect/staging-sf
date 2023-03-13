import { useForm } from "react-hook-form";
import Input from "components/atoms/Input";
import Checkbox from "components/atoms/Checkbox";
import RadioInput from "components/atoms/RadioInput";
import Button from "components/atoms/Button";
import { useRegisterAccount } from "./queries";
import { icons } from "core/constants";

const RegisterForm = () => {
  const { registerAccount, errorMessage } = useRegisterAccount();

  const { register, handleSubmit, watch, formState } = useForm();
  const { errors, isSubmitting } = formState;

  const isTrade = watch("type") === "trade";

  return (
    <form onSubmit={handleSubmit(registerAccount)} className="text-start">
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
        type="tel"
        label="Phone Number"
        name="phone"
        register={register}
        validation={{ required: true }}
        error={errors.phone}
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

      <div className="row gx-4">
        <div className="col-sm">
          <RadioInput
            name="type"
            defaultChecked={true}
            register={register}
            label="I'm a Customer"
            value="customer"
          />
        </div>
        <div className="col-sm">
          <RadioInput
            name="type"
            register={register}
            label="I'm a Tradesperson"
            value="trade"
          />
        </div>
      </div>

      <Checkbox
        label="I'm happy to be contacted regarding my enquiry & receive future offers from Trade Prices Direct."
        name="consent"
        register={register}
        validation={{ required: true }}
        error={errors.consent}
      />

      {isTrade ? (
        <Checkbox
          label={`I agree to the Trade Prices Direct <a href="/trade-account-terms-conditions" target="_blank">trade account terms & conditions</a>.`}
          name="terms"
          register={register}
          validation={{ required: true }}
          error={errors.terms}
        />
      ) : (
        <Checkbox
          label={`I agree to the Trade Prices Direct <a href="/customer-account-terms-conditions" target="_blank">customer account terms & conditions</a>.`}
          name="terms"
          register={register}
          validation={{ required: true }}
          error={errors.terms}
        />
      )}

      <div className="d-flex justify-content-center">
        <Button color="secondary" loading={isSubmitting} label="Create Account" icon={icons.faArrowRight} />
      </div>
    </form>
  );
};

export default RegisterForm;
