import BrandsList from "components/molecules/BrandsList";

import styles from "./FooterBrands.module.scss";

const FooterBrands = ({ totalCounts }) => {
  return (
    <div className={styles.wrap}>
      <BrandsList totalCounts={totalCounts} />

      <img
        src="/images/request-quote/finish-line.svg"
        className={styles.image}
      />
    </div>
  );
};

export default FooterBrands;
