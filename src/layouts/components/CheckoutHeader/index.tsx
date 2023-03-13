import Link from "next/link";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "core/constants";
import paths from "core/paths";
import Logo from "components/atoms/Logo";
import NavIcon from "components/atoms/NavIcon";
import styles from "./CheckoutHeader.module.scss";
import { FC } from "react";

const CheckoutHeader: FC<{ className?: string }> = ({ className }) => {
  return (
    <header id="masthead" className={clsx(styles.wrap, className)}>
      <div className="container">
        <div className="row align-items-center justify-content-between">
          <div className="col-sm-auto">
            <div className={styles.logo}>
              <Logo link />
            </div>
          </div>

          <div className="col-sm-auto">
            <ul className={styles.menu}>
              <li>
                <FontAwesomeIcon className={styles.icon} icon={icons.faLock} />
                Secure Checkout
              </li>
              <li>
                <Link href={paths.basket}>
                  <FontAwesomeIcon
                    className={styles.icon}
                    icon={icons.faShoppingBasket}
                  />
                  Back to Basket
                </Link>
              </li>
              <li>
                <a className={styles.chatLink} href="#">
                  Support Live Chat
                  <div className={styles.chatLinkIcon}>
                    <NavIcon icon={icons.faArrowRight} color="secondary" />
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CheckoutHeader;
