import { Fragment } from "react";
import { formatAddress } from "utils/address";

const AddressTileInfo = ({ address }) => {
  const addressString = formatAddress(address);

  return (
    <>
      <span>{`${address.firstName} ${address.lastName}`}</span>

      <address className="text-muted">
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

export default AddressTileInfo;
