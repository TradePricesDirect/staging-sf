import RichTextEditorContent from "components/atoms/RichTextEditorContent";

import styles from "./ProductDescription.module.scss";

const ProductDescription = ({ description }) => {
  return (
    <div className={styles.wrap}>
      <h2 className={styles.title}>{`Product Overview`}</h2>

      <RichTextEditorContent className={styles.text} jsonData={description} />
    </div>
  );
};

export default ProductDescription;
