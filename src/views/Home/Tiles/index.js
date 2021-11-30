import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import paths from "core/paths";
import useMenuLink from "hooks/useMenuLink";

import styles from "./Tiles.module.scss";

const Tiles = () => {
  const openMenu = useMenuLink();

  return (
    <div className={styles.wrap}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-6 col-lg-4">
            <Tile
              subtitle="Supply & Installation"
              title="I'm a Customer"
              text="Looking to get discounted prices to complete a home renovation project."
              label="Shop Home"
              path={openMenu}
              background="/icons/home/tile-customer-bg.svg"
              icon="/icons/home/tile-customer.svg"
              colour="secondary"
            />
          </div>
          <div className="col-12 col-sm-6 col-lg-4">
            <Tile
              subtitle="Supply & Delivery"
              title="I'm a Tradesperson"
              text="Looking for trades prices on over 500,000 products from top brands."
              label="Shop Trade"
              path={paths.trade}
              background="/icons/home/tile-trade-bg.svg"
              icon="/icons/home/tile-trade.svg"
              colour="primary"
            />
          </div>
          <div className="col-12 col-sm-6 col-lg-4">
            <Tile
              subtitle="Who Are We"
              title="About Us"
              text="Discover how we revolutionised home improvements."
              label="Learn More"
              path={paths.about}
              background="/icons/home/tile-about-bg.svg"
              icon="/icons/home/tile-about.svg"
              colour="secondary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tiles;

const Tile = ({
  path,
  subtitle,
  title,
  text,
  label,
  background,
  icon,
  colour,
}) => {
  const TileContent = () => (
    <>
      <div className={styles.content}>
        <h6 className={styles.subtitle}>{subtitle}</h6>
        <h5 className={styles.title}>{title}</h5>
        <p>{text}</p>
        <span className={clsx("btn btn-sm btn-circle", styles.button)}>
          {label}
        </span>
      </div>

      <Image
        src={background}
        className={styles.background}
        layout="fill"
        objectFit="contain"
        objectPosition="right"
        loading="eager"
        priority
      />

      <Image
        src={icon}
        className={styles.icon}
        layout="fill"
        objectFit="contain"
        loading="eager"
        priority
      />
    </>
  );

  return typeof path === "function" ? (
    <button
      type="button"
      onClick={path}
      className={styles.tile}
      data-color={colour}
    >
      <TileContent />
    </button>
  ) : (
    <Link href={path}>
      <a className={styles.tile} data-color={colour}>
        <TileContent />
      </a>
    </Link>
  );
};
