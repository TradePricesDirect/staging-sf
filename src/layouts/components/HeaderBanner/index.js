import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPiggyBank,
  faTruck,
  faPhoneAlt,
} from "@fortawesome/pro-light-svg-icons";

import styles from "./HeaderBanner.module.scss";
import paths from "core/paths";

const HeaderBanner = () => {
  return (
    <div className={styles.wrap}>
      <div className="container-xxl">
        <div className="row">
          <div className="col-lg-auto">
            <h2 className={styles.tagline}>
              Trade Prices Direct - UK's #1 Online Builders Merchant
            </h2>
          </div>
          <div className="col-lg">
            <ul className={styles.menu}>
              <li>
                <Link href={paths.finance}>
                  <a>
                    <FontAwesomeIcon icon={faPiggyBank} />
                    Finance Available
                  </a>
                </Link>
              </li>
              <li>
                <span>
                  <FontAwesomeIcon icon={faTruck} />
                  Free UK Delivery & Returns
                </span>
              </li>
              <li>
                <a href="tel:03333350439">
                  <FontAwesomeIcon icon={faPhoneAlt} />
                  0333 335 0439
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderBanner;
