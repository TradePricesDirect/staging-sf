import { Fragment } from "react";

export const formatAddress = (address, join = "\n") => {
  if (!address) return null;

  const result = [
    address.companyName,
    address.streetAddress1,
    address.streetAddress2,
    address.city,
    address.postalCode,
    address.country.country,
  ].filter((item) => item);

  return result.join(join);
};

export const FormattedAddress = ({ address }) => {
  const addressString = formatAddress(address);

  return (
    <>
      <span>{`${address.firstName} ${address.lastName}`}</span>

      <address className="m-0 text-muted">
        {addressString.split("\n").map((item, key) => {
          return (
            <Fragment key={key}>
              {item}
              <br />
            </Fragment>
          );
        })}
      </address>
    </>
  );
};
