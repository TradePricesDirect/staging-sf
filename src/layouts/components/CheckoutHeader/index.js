import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLockAlt, faShoppingBasket } from "@fortawesome/pro-solid-svg-icons";
import paths from "core/paths";
import Logo from "components/atoms/Logo";

import styles from "./CheckoutHeader.module.scss";

const CheckoutHeader = () => {
  return (
    <header id="masthead" className={styles.wrap}>
      <div className="container">
        <div className="row align-items-center justify-content-between">
          <div className="col-sm-auto">
            <div className={styles.logo}>
              <Logo />
            </div>
          </div>

          <div className="col-sm-auto">
            <ul className={styles.menu}>
              <li>
                <FontAwesomeIcon icon={faLockAlt} />
                Secure Checkout
              </li>
              <li>
                <Link href={paths.basket}>
                  <a>
                    <FontAwesomeIcon icon={faShoppingBasket} />
                    Back to Basket
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CheckoutHeader;
