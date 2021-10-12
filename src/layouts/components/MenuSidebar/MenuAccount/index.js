import Link from "next/link";
import { useAuth } from "@saleor/sdk";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen, faHeart, faUser } from "@fortawesome/pro-light-svg-icons";
import paths from "core/paths";
import useGreeting from "hooks/useGreeting";

import styles from "./MenuAccount.module.scss";

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
      <h3 className={styles.title}>{greeting}</h3>

      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li>
            <Link href={paths.account.dashboard}>
              <a className={styles.link}>
                My Account
                <FontAwesomeIcon icon={faUser} />
              </a>
            </Link>
          </li>
          <li>
            <Link href={paths.account.orders}>
              <a className={styles.link}>
                My Orders
                <FontAwesomeIcon icon={faBoxOpen} />
              </a>
            </Link>
          </li>
          <li>
            <Link href={paths.wishlists}>
              <a className={styles.link}>
                Wishlists
                <FontAwesomeIcon icon={faHeart} />
              </a>
            </Link>
          </li>
        </ul>
      </nav>

      <button
        onClick={() => signOut()}
        className="btn btn-outline-primary d-block w-100"
      >
        Sign Out
      </button>
    </div>
  );
}

function MenuAccountGuest() {
  const greeting = useGreeting();

  return (
    <div className={styles.wrap}>
      <h3 className={styles.title}>{greeting}</h3>

      <Link href={paths.login}>
        <a className="btn btn-outline-primary d-block w-100">Sign In</a>
      </Link>
    </div>
  );
}
