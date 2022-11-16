import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";

import styles from "./Intro.module.scss";
import paths from "core/paths";

const Intro = () => {
  return (
    <section className={styles.wrap}>
      <div className={clsx("container", styles.container)}>
        <h3 className="vertical-text">
          <span>Why Finance</span>
        </h3>

        <div className="row align-items-center">
          <div className="col-12 col-md-6 order-md-2">
            <div className={styles.content}>
              <h3>Get Affordable Finance</h3>
              <h2>No Cold Shocks, Just Affordable Boilers on Finance</h2>

              <p>
                At Trade Prices Direct, we've reinvented the way people get gas,
                oil, LPG and electric boilers. We make it easy to compare your
                options, understand costs, and finance your boiler.
              </p>

              <p>
                Financing a boiler with us is straight forward and affordable.
                Get approved within minutes.
              </p>

              <Link href={paths.finance}>
                <a className="btn btn-outline-primary">Boiler Finance</a>
              </Link>
            </div>
          </div>
          <div className="col-12 col-md-6 order-md-1">
            <div className={styles.grid}>
              <Tile
                image="/icons/finance/apply-online.svg"
                title="Apply Online in Minutes"
                text="Quick and simple application process with £0 deposit required."
              />
              <Tile
                image="/icons/finance/affordable.svg"
                title="Affordable Payments"
                text="Extremely competitive rates that certainly won't break the bank."
              />
              <Tile
                image="/icons/finance/next-day-boilers.svg"
                title="Next Day Boilers"
                text="No waiting around in the cold. We offer next day delivery on hundreds of boilers."
              />
              <Tile
                image="/icons/finance/no-hassle-heating.svg"
                title="No Hassle Heating"
                text="We stock hundreds of boilers, fit for every home."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;

const Tile = ({ image, title, text }) => {
  return (
    <div className={styles.tile}>
      <Image src={image} width={150} height={120} />
      <h4>{title}</h4>
      <p>{text}</p>
    </div>
  );
};
