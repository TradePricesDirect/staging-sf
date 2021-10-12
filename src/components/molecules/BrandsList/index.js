import Image from "next/image";

import styles from "./BrandsList.module.scss";

const BrandsList = ({ totalCounts }) => {
  const all = totalCounts?.all?.totalCount || "...";
  const inStock = totalCounts?.inStock?.totalCount || "...";

  return (
    <section className={styles.wrap}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-auto">
            <div className={styles.title}>
              Shop 1000's of <br />
              Brands Under One Roof
            </div>
          </div>
          <div className="col-md">
            <ul className={styles.list}>
              <li>
                <div className={styles.image}>
                  <Image
                    src="/images/bosch-logo.png"
                    alt="Bosch"
                    width={400}
                    height={89}
                  />
                </div>
              </li>
              <li>
                <div className={styles.stat}>
                  <strong>{all}</strong> No. of Products
                </div>
              </li>
              <li>
                <div className={styles.image}>
                  <Image
                    src="/images/siemens-logo.svg"
                    alt="Siemens"
                    width={400}
                    height={89}
                  />
                </div>
              </li>
              <li>
                <div className={styles.stat}>
                  <strong>{inStock}</strong> Products in Stock
                </div>
              </li>
              <li>
                <div className={styles.image}>
                  <Image
                    src="/images/quooker-logo.svg"
                    alt="Quooker"
                    width={400}
                    height={89}
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandsList;
