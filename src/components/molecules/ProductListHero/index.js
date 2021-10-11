import Image from "next/image";
import FeefoBadge from "components/atoms/FeefoBadge";

import styles from "./ProductListHero.module.scss";
import RichTextEditorContent from "components/atoms/RichTextEditorContent";

const ProductListHero = ({ title, description, backgroundImage }) => {
  return (
    <div className={styles.wrap}>
      <div className="container">
        <div className={styles.inner}>
          <h1 className={styles.title}>{title}</h1>

          {description && (
            <div className={styles.content}>
              <RichTextEditorContent jsonData={description} />
            </div>
          )}

          <FeefoBadge />
        </div>
      </div>

      {backgroundImage && (
        <>
          <Image
            src={backgroundImage.url}
            alt={backgroundImage.alt}
            layout="fill"
            loading="eager"
            objectFit="cover"
          />
          <div className={styles.overlay}></div>
        </>
      )}
    </div>
  );
};

export default ProductListHero;
