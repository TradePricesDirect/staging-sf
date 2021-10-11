import Link from "next/link";
import paths from "core/paths";

import styles from "./Newsletter.module.scss";

export default function Newsletter() {
  const privacyPolicy = (
    <Link href={paths.privacy}>
      <a>Privacy Policy</a>
    </Link>
  );

  return (
    <div className={styles.wrap}>
      <h4 className={styles.title}>Subscribe for even more deals</h4>

      <form className={styles.form}>
        <div className={styles.fields}>
          <input
            type="email"
            name="EMAIL"
            placeholder="Email address"
            className="form-control"
            required
          />
          <button type="submit" className="btn btn-primary">
            Subscribe
          </button>
        </div>
      </form>

      <small className={styles.disclaimer}>
        By subscribing you agree to be contacted inline with our {privacyPolicy}
        .
      </small>
    </div>
  );
}
