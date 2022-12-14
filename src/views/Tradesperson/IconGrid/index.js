import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import paths from "core/paths";

import styles from "./IconGrid.module.scss";

const IconGrid = () => {
  return (
    <div className={styles.wrap}>
      <div className={clsx("container", styles.container)}>
        <h3 className="vertical-text">
          <span>Why Register</span>
        </h3>

        <h2 className={styles.title}>
          Sign up with Trade Prices Direct and enjoy...
        </h2>

        <div className={styles.grid}>
          <Tile
            image="/icons/tradesperson/0-finance.svg"
            title="0% Finance Packages"
            text="Access to a wide range of 0% Finance packages from leading providers."
          />

          <Tile
            image="/icons/tradesperson/free-leads.svg"
            title="Unlimited, Free Leads"
            text="Get connected to customers across the UK looking for reliable tradespeople."
          />

          <Tile
            image="/icons/tradesperson/no-strings.svg"
            title="No Strings or Red Tape"
            text="Enjoy 100% flexiblity, working when and where you want with no fixed terms or contracts."
          />

          <Tile
            image="/icons/tradesperson/great-pricing.svg"
            title="Great Pricing on Materials"
            text="Get access to trade prices on hundreds of thousands of products from leading brands."
          />

          <Tile
            image="/icons/tradesperson/express-delivery.svg"
            title="Express Delivery"
            text="Browse thousands of products in stock & available for express or next day delivery."
          />

          <Tile
            image="/icons/tradesperson/fuel-card.svg"
            title="Free Fuel Card"
            text="Keep the wheels turning with a completely free fuel card when you sign up."
          />

          <Tile
            image="/icons/tradesperson/membership-rewards.svg"
            title="Membership Rewards"
            text="Get cashback for every purchase you make with Trade Prices Direct."
          />

          <Tile
            image="/icons/tradesperson/van-leasing.svg"
            title="Exclusive Van Leasing"
            text="All our members get exclusive lease prices on vans with no credit checks."
          />
        </div>

        <Link href={paths.register} className="btn btn-primary">
          Register For Free
        </Link>
      </div>
    </div>
  );
};

export default IconGrid;

const Tile = ({ image, title, text }) => {
  return (
    <div className={styles.tile}>
      <Image src={image} width={150} height={120} />
      <h4>{title}</h4>
      <p>{text}</p>
    </div>
  );
};
