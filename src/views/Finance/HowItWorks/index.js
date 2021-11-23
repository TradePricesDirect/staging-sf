import { useState } from "react";
import clsx from "clsx";
import { v4 as uuid } from "uuid";
import NavPills from "components/atoms/NavPills";
import Klarna from "./Klarna";
import Propensio from "./Propensio";

import styles from "./HowItWorks.module.scss";

const THUMBNAILS = [
  { id: uuid(), name: "Propensio" },
  { id: uuid(), name: "Klarna" },
];

const HowItWorks = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleTabChange = (index) => setActiveIndex(index);

  const renderTab = () => {
    switch (activeIndex) {
      case 0:
        return <Propensio />;
      case 1:
        return <Klarna />;
      default:
        return null;
    }
  };

  return (
    <section className={styles.wrap}>
      <div className="container">
        <div className="row">
          <div className={clsx("col-md-4", styles.content)}>
            <div className={styles.inner}>
              <h6>Discover</h6>
              <h3>How Financing Your Purchase Works</h3>

              <p>
                Financing your purchase is now easier than ever with affordable
                options from Klarna and Propensio. Get approval online within
                minutes, with pay in 3 from Klarna for anything under £1,000.
                For larger purchases of up to £25,000.00, opt to spread the cost
                up to 10 years with Propensio.
              </p>
            </div>
          </div>

          <div className={clsx("col-md-8", styles.process)}>
            <div className={styles.inner}>
              <div className={styles.navPills}>
                <NavPills
                  values={THUMBNAILS}
                  onValueClick={handleTabChange}
                  activeIndex={activeIndex}
                />
              </div>

              <div className={styles.tabs}>
                <div key={`tab-${activeIndex}`} className={styles.tab}>
                  {renderTab()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
