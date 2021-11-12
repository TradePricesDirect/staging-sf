import Link from "next/link";
import Image from "next/image";

import styles from "./FeaturedBrands.module.scss";

const FeaturedBrands = ({ brands }) => {
  return (
    <section className={styles.wrap}>
      <ul className={styles.list}>
        {brands.map(({ name, href, backgroundImage }) => (
          <li key={backgroundImage}>
            <Link href={href}>
              <a className={styles.brand}>
                <Image src={backgroundImage} alt="name" layout="fill" />

                <span className="visually-hidden">{name}</span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FeaturedBrands;
