import Image from "next/image";

import styles from "./TopBrands.module.scss";

const TopBrands = ({ title, subtitle, logos }) => {
  return (
    <section className={styles.wrap}>
      <div className="container">
        <header className={styles.header}>
          <div className="row">
            <div className="col-12 col-sm">
              <h3 className={styles.title}>{title}</h3>
            </div>
            <div className="col col-sm text-sm-end">
              <p className={styles.subtitle}>{subtitle}</p>
            </div>
          </div>
        </header>

        <ul className={styles.list}>
          {logos.map((logo) => (
            <li key={logo}>
              <Image src={logo} alt="" width={420} height={150} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TopBrands;
