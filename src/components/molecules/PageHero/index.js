import styles from "./PageHero.module.scss";

const PageHero = ({ content, image }) => {
  return (
    <section className={styles.wrap}>
      <div className="container">
        <div className="row gx-4">
          <div className="col-md-6 col-lg-5">
            <div className={styles.body}>
              <div className={styles.content}>{content}</div>
            </div>
          </div>
          <div className="col-md-6 col-lg-7 align-self-end">
            <div className={styles.image}>{image}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageHero;
