import { useMemo } from "react";
import { NumberParam, StringParam, useQueryParam } from "use-query-params";
import { PRODUCTS_PER_PAGE } from "core/config";
import { FilterQuerySet } from "utils/collections";
import MetaTags from "components/atoms/MetaTags";
import Page from "./Page";
import { useProductsQuery } from "./queries";
import { filtersChangeHandler } from "./utils";

const CategoryView = ({ data: category }) => {
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
    categoryId: category.id,
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
        title={category.details.seoTitle || category.details.name}
        description={category.details.seoDescription}
        meta={{ "og:type": "product.category" }}
      />

      <Page
        displayLoader={loading}
        category={category}
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

export default CategoryView;
