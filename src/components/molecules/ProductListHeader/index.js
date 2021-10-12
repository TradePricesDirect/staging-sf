import styles from "./ProductListHeader.module.scss";

const ProductListHeader = ({
  renderBreadcrumb,
  numberOfProducts = 0,
  // onClearFilters,
  // activeSortOption,
  // sortOptions,
  // onSortChange,
  // activePerPageOption,
  // perPageOptions,
  // onPerPageChange,
}) => {
  return (
    <div className="row justify-content-between">
      <div className="col">{renderBreadcrumb}</div>
      <div className="col-auto">
        <p className={styles.total}>{`Products Found: ${numberOfProducts}`}</p>
      </div>
    </div>
  );
};

export default ProductListHeader;
