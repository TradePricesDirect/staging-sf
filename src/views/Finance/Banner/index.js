import Image from "next/image";
import clsx from "clsx";
import { SUPPORT_PHONE } from "core/config";

import styles from "./Banner.module.scss";

const callLink = (
  <a href={`tel:${SUPPORT_PHONE.replace(/ /g, "")}`}>Call Us...</a>
);

const Banner = () => {
  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <div className={clsx(styles.image, styles.left)}>
          <Image src="/icons/finance/cta-faq.svg" width={230} height={184} />
        </div>

        <h3 className={styles.title}>
          More Questions Than Answers? {callLink}
        </h3>
      </div>
    </div>
  );
};

export default Banner;
