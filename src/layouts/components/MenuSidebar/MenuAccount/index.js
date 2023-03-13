import Link from "next/link";
import { useAuth } from "@saleor/sdk";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "core/constants";
import paths from "core/paths";
import useGreeting from "hooks/useGreeting";

import styles from "./MenuAccount.module.scss";
import clsx from "clsx";

const MenuAccount = () => {
  const { user } = useAuth();

  return user ? <MenuAccountUser user={user} /> : <MenuAccountGuest />;
};

export default MenuAccount;

function MenuAccountUser({ user }) {
  const { signOut } = useAuth();

  const greeting = useGreeting(user.firstName);

  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <h3 className={styles.title}>{greeting}</h3>

        <nav className={styles.nav}>
          <ul className={styles.list}>
            <li>
              <Link
                href={paths.account.dashboard}
                className={styles.link}>
                <span className={styles.icon}>
                  <FontAwesomeIcon icon={icons.faUser} />
                </span>
                <span className={styles.text}>
                  {"My Account"}
                </span>
                <span className={styles.chevron}>
                  <FontAwesomeIcon icon={icons.faChevronRight} />
                </span>
              </Link>
            </li>
            <li>
              <Link
                href={paths.account.orders}
                className={styles.link}>
                <span className={styles.icon}>
                  <FontAwesomeIcon icon={icons.faTruck} />
                </span>
                <span className={styles.text}>
                  {"My Orders"}
                </span>
                <span className={styles.chevron}>
                  <FontAwesomeIcon icon={icons.faChevronRight} />
                </span>
              </Link>
            </li>
            <li>
              <Link
                href={paths.wishlists}
                className={styles.link}>
                <span className={styles.icon}>
                  <FontAwesomeIcon icon={icons.faHeart} />
                </span>
                <span className={styles.text}>
                  {"Wishlists"}
                </span>
                <span className={styles.chevron}>
                  <FontAwesomeIcon icon={icons.faChevronRight} />
                </span>
              </Link>
            </li>
            <li>
              <button
                type="button"
                className={clsx(styles.button, styles.link)}
                onClick={signOut}>
                <span className={styles.icon}>
                  <FontAwesomeIcon icon={icons.faSignOut} />
                </span>
                <span className={styles.text}>
                  {"Sign Out"}
                </span>
                <span className={styles.chevron}>
                  <FontAwesomeIcon icon={icons.faChevronRight} />
                </span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

function MenuAccountGuest() {
  const greeting = useGreeting();

  return (
    <div className={styles.wrap}>
      <h3 className={styles.title}>{greeting}</h3>

      <Link href={paths.login} className="btn btn-outline-primary d-block w-100">
        Sign In
      </Link>
    </div>
  );
}
