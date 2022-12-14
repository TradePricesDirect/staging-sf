import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import paths from "core/paths";

import styles from "./Banner.module.scss";

const registerLink = (
  <Link href={paths.register}>
    Register now!
  </Link>
);

const Banner = () => {
  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <div className={clsx(styles.image, styles.left)}>
          <Image
            src="/icons/tradesperson/cta-rocket.svg"
            width={230}
            height={184}
          />
        </div>

        <h3 className={styles.title}>
          Take your business to the next level. {registerLink}
        </h3>

        <div className={clsx(styles.image, styles.right)}>
          <Image
            src="/icons/tradesperson/cta-king.svg"
            width={230}
            height={184}
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
