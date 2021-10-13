import styles from "./ProductMeta.module.scss";

const ProductMeta = ({ sku, stock }) => {
  return (
    <div className="row gx-4 mb-4">
      <div className="col-auto">
        <div className={styles.sku}>
          SKU: <bdi>{sku}</bdi>
        </div>
      </div>
      <div className="col-auto">
        STOCK HERE
        {/* <StockStatus stock={variant.stock} /> */}
      </div>
    </div>
  );
};

export default ProductMeta;
