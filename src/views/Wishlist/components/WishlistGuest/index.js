import Link from "next/link";
import paths from "core/paths";

import styles from "./WishlistGuest.module.scss";

const WishlistGuest = () => {
  return (
    <div className={styles.wrap}>
      <h2 className={styles.title}>All Your Lists, All in One Place</h2>

      <p className="mb-8">
        Please sign in or register for an account to begin creating lists.
      </p>

      <Link href={paths.register}>
        <a className="btn btn-primary">Sign in or Create an Account</a>
      </Link>
    </div>
  );
};

export default WishlistGuest;
