import clsx from "clsx";
import styles from "./PageHero.module.scss";

const PageHero = ({ content, image, imageAlignEnd, imageSmall }) => {
  return (
    <section className={styles.wrap}>
      <div className="container">
        <div className="row gx-4 align-items-center">
          <div className="col-md-6 col-lg-5">
            <div className={styles.body}>
              <div className={styles.content}>{content}</div>
            </div>
          </div>
          <div
            className={clsx(
              "col-md-6 col-lg-7",
              imageAlignEnd && "align-self-end"
            )}
          >
            <div className={clsx(styles.image, imageSmall && styles.small)}>
              {image}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageHero;
