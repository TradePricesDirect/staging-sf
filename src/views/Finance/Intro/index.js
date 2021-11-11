import Image from "next/image";
import clsx from "clsx";

import styles from "./Intro.module.scss";

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
              <h2>Don't sacrifice...Spread the cost with flexible payments</h2>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>

              <ul className={styles.options}>
                <li className={styles.option}>
                  <div className={styles.gatewayIcon}>
                    <Image
                      src="/icons/finance/payment-propensio.svg"
                      width={200}
                      height={85}
                    />
                  </div>
                  <span>Over £1,000</span>
                </li>

                <li className={styles.option}>
                  <div className={styles.gatewayIcon}>
                    <Image
                      src="/icons/finance/payment-klarna.svg"
                      width={200}
                      height={85}
                    />
                  </div>
                  <span>Under £1,000</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-12 col-md-6 order-md-1">
            <div className={styles.grid}>
              <Tile
                image="/icons/finance/apply-online.svg"
                title="Apple Online in Minutes"
                text="The process is quick and simple, and most applications are improved within hours."
              />
              <Tile
                image="/icons/finance/affordable.svg"
                title="Affordable Payments"
                text="We offer extremely competitive rates that certainly won’t break the bank."
              />
              <Tile
                image="/icons/finance/zero-deposit.svg"
                title="Zero Deposit Required"
                text="Secure your finance with £0 deposit."
              />
              <Tile
                image="/icons/finance/spread-cost.svg"
                title="Spread the Cost"
                text="Spread the cost of your dream home over 5 years."
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
