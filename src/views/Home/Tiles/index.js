import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import paths from "core/paths";

import bgCustomer from "./tile-customer.png";
import bgTrade from "./tile-tradesperson.png";
import bgAbout from "./tile-about.png";

import styles from "./Tiles.module.scss";

const Tiles = () => {
  return (
    <div className={styles.wrap}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-6 col-lg-4">
            <Tile
              path={paths.shop}
              subtitle="Supply & Installation"
              title="I'm a Customer"
              text="Looking to get discounted prices to complete a home renovation
          project."
              label="Shop Home"
              background={bgCustomer}
              colour="secondary"
            />
          </div>
          <div className="col-12 col-sm-6 col-lg-4">
            <Tile
              path={paths.trade}
              subtitle="Supply & Delivery"
              title="I'm a Tradesperson"
              text="Looking for trades prices on over 500,000 products from top brands."
              label="Shop Trade"
              background={bgTrade}
              colour="primary"
            />
          </div>
          <div className="col-12 col-sm-6 col-lg-4">
            <Tile
              path={paths.about}
              subtitle="Who Are We"
              title="Who Are We?"
              text="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui, dignissimos."
              label="Learn More"
              background={bgAbout}
              colour="secondary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tiles;

const Tile = ({ path, subtitle, title, text, label, background, colour }) => {
  return (
    <Link href={path}>
      <a className={styles.tile} data-color={colour}>
        <div className={styles.content}>
          <h6 className={styles.subtitle}>{subtitle}</h6>
          <h5 className={styles.title}>{title}</h5>
          <p>{text}</p>
          <span className={clsx("btn btn-sm", styles.button)}>{label}</span>
        </div>

        <Image
          src={background}
          className={styles.image}
          layout="fill"
          objectFit="cover"
        />
      </a>
    </Link>
  );
};
