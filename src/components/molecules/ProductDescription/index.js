import RichTextEditorContent from "components/atoms/RichTextEditorContent";

import styles from "./ProductDescription.module.scss";

const ProductDescription = ({ description }) => {
  return (
    <div className={styles.wrap}>
      <h2 className={styles.title}>Description</h2>

      <RichTextEditorContent jsonData={description} />
    </div>
  );
};

export default ProductDescription;
