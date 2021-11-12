import { useEffect } from "react";
import Image from "next/image";
import clsx from "clsx";
import FeefoBadge from "components/atoms/FeefoBadge";

import styles from "./FeefoReviews.module.scss";

const FeefoReviews = () => {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://api.feefo.com/api/javascript/tradepricesdirect-com";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section className={styles.wrap}>
      <header className={styles.header}>
        <div className={clsx("container", styles.container)}>
          <div className="row align-items-center justify-content-center">
            <div className="col-12 col-md-6 offset-md-3">
              <h2 className={styles.title}>See our testimonials & reviews</h2>
            </div>
            <div className="col-12 col-md-3">
              <FeefoBadge className={styles.badge} />
            </div>
          </div>

          <div className={styles.image}>
            <Image
              src="/icons/reviews-icon.svg"
              alt=""
              width={180}
              height={165}
            />
          </div>
        </div>
      </header>

      <div className="container">
        <div
          id="feefo-service-review-carousel-widgetId"
          className={styles.widget}
        />
      </div>
    </section>
  );
};

export default FeefoReviews;
