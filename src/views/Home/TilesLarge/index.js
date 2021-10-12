import Link from "next/link";
import Image from "next/image";
import paths from "core/paths";

import styles from "./TilesLarge.module.scss";

const TilesLarge = () => {
  return (
    <div className="container mb-8">
      <div className="row">
        <div className="col-12 col-sm-6">
          <Tile
            subtitle="Financing Options"
            title="Spread The Cost & Finance"
            text="Your renovation doesn’t need to break the bank. Spread the cost of your purchase and get up to 5 years credit."
            image="/images/icon-finance.svg"
            buttonText="Learn More"
            path={paths.finance}
          />
        </div>
        <div className="col-12 col-sm-6">
          <Tile
            subtitle="100% Free, No Strings"
            title="Register Today & Save"
            text="There are no catches, just good business. We cut out the fancy showrooms & pass the savings onto you."
            image="/images/icon-no-strings.svg"
            buttonText="Register Now"
            path={paths.register}
          />
        </div>
      </div>
    </div>
  );
};

export default TilesLarge;

const Tile = ({ subtitle, title, text, image, buttonText, path }) => {
  return (
    <div className={styles.tile}>
      <div className={styles.imageWrap}>
        <div className={styles.image}>
          <Image
            src={image}
            layout="fill"
            objectFit="contain"
            objectPosition="left bottom"
          />
        </div>
      </div>

      <div className={styles.content}>
        <h6>{subtitle}</h6>
        <h5>{title}</h5>
        <p>{text}</p>

        <Link href={path}>
          <a className="btn btn-sm btn-outline-primary">{buttonText}</a>
        </Link>
      </div>
    </div>
  );
};
