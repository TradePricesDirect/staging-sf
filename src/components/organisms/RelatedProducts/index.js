import ProductCarousel from "components/organisms/ProductCarousel";

import styles from "./RelatedProducts.module.scss";

const RelatedProducts = ({ title, products }) => {
  return (
    <div className={styles.wrap}>
      <h3 className={styles.title}>{title}</h3>

      <ProductCarousel products={products} />
    </div>
  );
};

export default RelatedProducts;
