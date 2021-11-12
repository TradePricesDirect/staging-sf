import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";

import styles from "./LuxuryGrid.module.scss";

const LuxuryGrid = ({ title, subtitle, content }) => {
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
                src="/images/kitchens/luxury-quooker.jpg"
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
                src="/images/kitchens/luxury-wine-cooler.jpg"
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
                src="/images/kitchens/luxury-coffee.jpg"
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
                <Link href={content.button.href}>
                  <a className="btn btn-outline-primary">
                    {content.button.text}
                  </a>
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
