import Breadcrumbs, { extractBreadcrumbs } from "components/atoms/Breadcrumbs";

import styles from "./ProductListHeader.module.scss";

const ProductListHeader = ({
  details,
  ancestors,
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
      <div className="col">
        <Breadcrumbs breadcrumbs={extractBreadcrumbs(details, ancestors)} />
      </div>
      <div className="col-auto">
        <p className={styles.total}>{`Products Found: ${numberOfProducts}`}</p>
      </div>
    </div>
  );
};

export default ProductListHeader;
