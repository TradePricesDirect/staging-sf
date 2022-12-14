import Image from "next/image";
import { formatNumber } from "utils/number";
import TitleIcon from "./shop-brands-title.svg";

import styles from "./BrandsList.module.scss";

const BrandsList = ({ totalCounts }) => {
  const all = formatNumber(totalCounts.all.totalCount);
  const nextDayProducts = formatNumber(20872);

  // const inStock = formatNumber(totalCounts.inStock.totalCount);

  return (
    <section className={styles.wrap}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-auto">
            <h3 className={styles.title}>
              {"Shop 100's of Brands Under One Roof"}
            </h3>
            <TitleIcon className={styles.titleIcon} />
          </div>
          <div className="col-md">
            <ul className={styles.list}>
              <li>
                <div className={styles.image}>
                  <Image
                    src="/images/logos/brand-quooker.png"
                    alt="Quooker"
                    width={420}
                    height={150}
                  />
                </div>
              </li>
              <li>
                <div className={styles.stat}>
                  <strong>{all}</strong>{" "}{"No. of Products"}
                </div>
              </li>
              <li>
                <div className={styles.image}>
                  <Image
                    src="/images/logos/brand-synergy.png"
                    alt="Synergy"
                    width={420}
                    height={150}
                  />
                </div>
              </li>
              <li>
                <div className={styles.stat}>
                  <strong>{nextDayProducts}</strong>{" "}{"Next Day Products"}
                </div>
              </li>
              <li>
                <div className={styles.image}>
                  <Image
                    src="/images/logos/brand-vaillant.png"
                    alt="Vaillant"
                    width={420}
                    height={150}
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
