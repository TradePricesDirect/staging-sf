import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { v4 as uuidv4 } from "uuid";
import paths from "core/paths";
import NavPills from "components/atoms/NavPills";
import Customer from "./Customer";
import Trade from "./Trade";
import Commercial from "./Commercial";

import styles from "./HowItWorks.module.scss";

const THUMBNAILS = [
  { id: uuidv4(), name: "Customer" },
  { id: uuidv4(), name: "Trade" },
  { id: uuidv4(), name: "Commercial" },
];

const HowItWorks = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleTabChange = (index) => setActiveIndex(index);

  const renderTab = () => {
    switch (activeIndex) {
      case 0:
        return <Customer />;
      case 1:
        return <Trade />;
      case 2:
        return <Commercial />;
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
              <h6>How it Works</h6>
              <h3>Why Shop with Trade Prices Direct</h3>

              <p>
                We cut out the salesmen, fancy showrooms and deal directly with
                manufacturers to get top brands at rock bottom prices. We then
                pass this saving onto you the consumer.
              </p>

              <Link href={paths.register}>
                <a className="btn btn-secondary">Register Now</a>
              </Link>
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
