import ProductTile from "components/molecules/ProductTile";
import ProductTileSkeleton from "components/molecules/ProductTileSkeleton";

import styles from "./ProductList.module.scss";

const ProductList = ({
  products,
  perPage,
  loading = false,
  canLoadMore = false,
  onLoadMore,
  activeFilters,
  onClearFilters,
}) => {
  if (loading) return <ProductListLoading count={perPage} />;

  if (!products.length) {
    return (
      <ProductListEmpty
        activeFilters={activeFilters}
        onClearFilters={onClearFilters}
      />
    );
  }

  return (
    <>
      <ul className={styles.list}>
        {products.map((product) => (
          <li key={`product-${product.id}`}>
            <ProductTile product={product} />
          </li>
        ))}
      </ul>

      {canLoadMore && (
        <button type="button" onClick={onLoadMore} className="btn btn-primary">
          Load More
        </button>
      )}
    </>
  );
};

export default ProductList;

const ProductListLoading = ({ count }) => {
  return (
    <ul className={styles.list}>
      {[...Array(count)].map((_, index) => (
        <li key={`skeleton-${index}`}>
          <ProductTileSkeleton />
        </li>
      ))}
    </ul>
  );
};

const ProductListEmpty = ({ activeFilters, onClearFilters }) => {
  return (
    <div>
      <p className="mb-4">No products found.</p>

      {activeFilters > 0 && (
        <button
          onClick={onClearFilters}
          type="button"
          className="btn btn-primary"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
};
