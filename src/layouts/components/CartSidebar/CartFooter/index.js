import Image from "next/image";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "core/constants";
import { SUPPORT_PHONE } from "core/config";

import styles from "./CartFooter.module.scss";

const CartFooter = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.icon}>
        <Image
          src="/icons/get-help.svg"
          alt="Get Help"
          width={100}
          height={100}
        />
      </div>

      <h4>Get Help</h4>
      <p>Speak to our customer support team</p>

      <a
        href={`tel:${SUPPORT_PHONE.replace(/ /g, "")}`}
        className={clsx("btn btn-sm", styles.phoneButton)}
      >
        <FontAwesomeIcon icon={icons.faPhoneAlt} />
        {SUPPORT_PHONE}
      </a>
    </div>
  );
};

export default CartFooter;
