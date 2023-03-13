import clsx from "clsx";
import FeefoBadge from "components/atoms/FeefoBadge";
import { FC } from "react";
import PaymentIcons from "./PaymentIcons";

import styles from "./Subfooter.module.scss";

const Subfooter: FC<{ className?: string }> = ({ className }) => {
  return (
    <section className={clsx(styles.wrap, className)}>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-4 col-lg-6 order-md-1">
            <h3 className={styles.title}>Payment Options</h3>

            <PaymentIcons />
          </div>

          <div className="col-12 col-md-4 col-lg-3 order-md-0">
            {/*
            <h3 className={styles.title}>Keep Social</h3>

            <SocialIcons />
            */}
          </div>

          <div className="col-12 col-md-4 col-lg-3 order-md-2">
            <h3 className={styles.title}>Our Reviews</h3>

            <FeefoBadge className={styles.badge} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Subfooter;
