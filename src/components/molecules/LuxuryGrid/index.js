import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";

import styles from "./LuxuryGrid.module.scss";

const LuxuryGrid = ({ title, subtitle, content, images }) => {
  return (
    <section className={styles.wrap}>
      <div className="container">
        <header className={styles.header}>
          <div className="row">
            <div className="col-12 col-sm">
              <h2 className={styles.title}>{title}</h2>
            </div>
            <div className="col col-sm text-sm-end">
              <p className={styles.subtitle}>{subtitle}</p>
            </div>
          </div>
        </header>

        <div className={styles.grid}>
          <div className={clsx(styles.gridItem, styles.large)}>
            <div className={styles.image}>
              <Image
                src={images[0]}
                alt=""
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />
            </div>
          </div>

          <div className={clsx(styles.gridItem, styles.tall)}>
            <div className={styles.image}>
              <Image
                src={images[1]}
                alt=""
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />
            </div>
          </div>

          <div className={styles.gridItem}>
            <div className={styles.image}>
              <Image
                src={images[2]}
                alt=""
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />
            </div>
          </div>

          <div className={clsx(styles.gridItem, styles.body)}>
            <div className={styles.content}>
              <div className={styles.inner}>
                <h4>{content.subtitle}</h4>
                <h3>{content.title}</h3>
                <p>{content.text}</p>
                <Link href={content.button.href} className="btn btn-outline-primary">
                  {content.button.text}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LuxuryGrid;
