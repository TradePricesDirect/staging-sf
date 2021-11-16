import Link from "next/link";
import paths from "core/paths";

import styles from "./CallToAction.module.scss";

const CallToAction = () => {
  return (
    <section className={styles.wrap}>
      <div className={styles.line} />

      <div className="container">
        <div className={styles.content}>
          <div className={styles.inner}>
            <h3>Turn Dreams into Reality</h3>

            <h2>Register for Free Today</h2>

            <p>
              Stop dreaming about your perfect house and start living in it.
              Registration is 100% free and there are absolutely no hidden
              costs.
            </p>

            <Link href={paths.register}>
              <a className="btn btn-primary">Register & Shop</a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
