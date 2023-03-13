import { useEffect, useMemo } from "react";
import { useAuth } from "@saleor/sdk";
import { icons } from "core/constants";
import { useForm } from "react-hook-form";
import { useShop } from "contexts/ShopContext";
import Input from "components/atoms/Input";
import Select from "components/atoms/Select";
import Button from "components/atoms/Button"

const AddressForm = ({ address, onSubmit, errors: formErrors }) => {
  const { user } = useAuth();
  const { defaultCountry, countries } = useShop();

  const { register, handleSubmit, setError, formState, control } = useForm();
  const { errors, isSubmitting } = formState;

  useEffect(() => {
    if (formErrors) {
      formErrors.forEach(({ field, message }) => setError(field, { message }));
    }
  }, [formErrors]);

  const data = useMemo(() => {
    return address
      ? {
        ...address,
        country: address.country.code,
      }
      : {
        firstName: user.firstName,
        lastName: user.lastName,
        companyName: "",
        streetAddress1: "",
        streetAddress2: "",
        city: "", // town_or_city
        cityArea: "", // district
        postalCode: "", // postcode
        country: defaultCountry?.code || "GB", // country code
        countryArea: "", // county
        phone: "",
      };
  }, [address]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row gy-0 gx-4">
        <div className="col-12 col-sm-6">
          <Input
            label="First Name"
            name="firstName"
            defaultValue={data.firstName}
            register={register}
            validation={{ required: true }}
            error={errors.firstName}
          />
        </div>
        <div className="col-12 col-sm-6">
          <Input
            label="Last Name"
            name="lastName"
            defaultValue={data.lastName}
            register={register}
            validation={{ required: true }}
            error={errors.lastName}
          />
        </div>

        <div className="col-12 col-sm-6">
          <Input
            label="Company Name (Optional)"
            name="companyName"
            defaultValue={data.companyName}
            register={register}
            validation={{ required: false }}
            error={errors.companyName}
          />
        </div>

        <div className="col-12 col-sm-6">
          <Input
            label="Phone Number"
            name="phone"
            defaultValue={data.phone}
            register={register}
            validation={{ required: true }}
            error={errors.phone}
          />
        </div>
      </div>

      <Input
        label="Address Line 1"
        name="streetAddress1"
        defaultValue={data.streetAddress1}
        register={register}
        validation={{ required: true }}
        error={errors.streetAddress1}
      />

      <Input
        label="Address Line 2"
        name="streetAddress2"
        defaultValue={data.streetAddress2}
        register={register}
        validation={{ required: false }}
        error={errors.streetAddress2}
      />

      <div className="row gy-0 gx-4">
        <div className="col-12 col-sm-6">
          <Input
            label="City"
            name="city"
            defaultValue={data.city}
            register={register}
            validation={{ required: true }}
            error={errors.city}
          />
        </div>
        <div className="col-12 col-sm-6">
          <Input
            label="Postcode"
            name="postalCode"
            defaultValue={data.postalCode}
            register={register}
            validation={{ required: true }}
            error={errors.postalCode}
          />
        </div>
      </div>

      <Select
        name="country"
        placeholder="Select Country"
        defaultValue={data.country}
        control={control}
        options={countries.map(({ country, code }) => ({
          label: country,
          value: code,
        }))}
      />

      <Button
        submit
        color={"secondary"}
        loading={isSubmitting}
        disabled={isSubmitting}
        label={`Save address`}
        icon={icons.faArrowRight}
      />
    </form>
  );
};

export default AddressForm;
