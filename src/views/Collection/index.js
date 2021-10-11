import { useMemo } from "react";
import { NumberParam, StringParam, useQueryParam } from "use-query-params";
import { PRODUCTS_PER_PAGE } from "core/config";
import { FilterQuerySet } from "utils/collections";
import MetaTags from "components/atoms/MetaTags";
import Page from "./Page";
import { useProductsQuery } from "../Category/queries";
import { filtersChangeHandler } from "../Category/utils";

const CollectionView = ({ data: collection }) => {
  const [perPage, setPerPage] = useQueryParam("perPage", NumberParam);
  const [sort, setSort] = useQueryParam("sortBy", StringParam);
  const [attributeFilters, setAttributeFilters] = useQueryParam(
    "filters",
    FilterQuerySet
  );

  const filters = {
    attributes: attributeFilters,
    priceGte: null,
    priceLte: null,
    sortBy: sort || null,
    perPage: perPage || PRODUCTS_PER_PAGE,
  };

  const { data, loadMore, loading } = useProductsQuery(filters, {
    collectionId: collection.id,
  });

  const [products, pageInfo, numberOfProducts] = useMemo(
    () => [
      data?.products?.edges.map((e) => e.node) || [],
      data?.products?.pageInfo,
      data?.products?.totalCount || 0,
    ],
    [data]
  );

  const handleClearFilters = () => setAttributeFilters({});

  const handleFiltersChange = filtersChangeHandler(
    filters,
    attributeFilters,
    setAttributeFilters
  );

  const handleSortChange = ({ value }) => setSort(value);
  const handlePerPageChange = ({ value }) => setPerPage(value);

  const handleLoadMore = () => {
    return loadMore(
      (prev, next) => ({
        products: {
          ...prev.products,
          edges: [...prev.products.edges, ...next.products.edges],
          pageInfo: next.products.pageInfo,
        },
      }),
      pageInfo.endCursor
    );
  };

  return (
    <>
      <MetaTags
        title={collection.details.seoTitle}
        description={collection.details.seoDescription}
        meta={{ "og:type": "product.collection" }}
      />

      <Page
        displayLoader={loading}
        collection={collection}
        products={products}
        numberOfProducts={numberOfProducts}
        hasNextPage={!!pageInfo?.hasNextPage}
        filters={filters}
        activeFilters={Object.keys(filters?.attributes || {}).length}
        activeSortOption={filters.sortBy}
        activePerPageOption={filters.perPage}
        onClearFilters={handleClearFilters}
        onAttributeFiltersChange={handleFiltersChange}
        onLoadMore={handleLoadMore}
        onSortChange={handleSortChange}
        onPerPage={handlePerPageChange}
      />
    </>
  );
};

export default CollectionView;
