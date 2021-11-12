import Image from "next/image";
import FinanceRibbon from "components/atoms/FinanceRibbon";

import styles from "./CategoryHero.module.scss";

const CategoryHero = ({ title, description, backgroundImage }) => {
  return (
    <div className={styles.wrap}>
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>

        {description && (
          <div className={styles.description}>
            <p>{description}</p>
          </div>
        )}
      </div>

      {backgroundImage && (
        <div className={styles.background}>
          <Image
            src={backgroundImage}
            alt=""
            layout="fill"
            loading="eager"
            objectFit="cover"
            priority
          />
        </div>
      )}

      <FinanceRibbon className={styles.ribbon} />
    </div>
  );
};

export default CategoryHero;
