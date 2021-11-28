import Link from "next/link";
import Image from "next/image";
import paths from "core/paths";
import FinanceRibbon from "components/atoms/FinanceRibbon";
import RichTextEditorContent from "components/atoms/RichTextEditorContent";

import styles from "./CategoryHero.module.scss";

const CategoryHero = ({ title, description, backgroundImage }) => {
  return (
    <div className={styles.wrap}>
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>

        {description && (
          <div className={styles.description}>
            <RichTextEditorContent jsonData={description} />
          </div>
        )}

        <Link href={paths.requestQuote}>
          <a className="btn btn-secondary">Request a Quote</a>
        </Link>
      </div>

      {backgroundImage && (
        <div className={styles.background}>
          <Image
            src={backgroundImage.url}
            alt={backgroundImage.alt}
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
