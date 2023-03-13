import { FC, useEffect, useMemo, useState } from "react";
import { NumberParam, StringParam, useQueryParam } from "use-query-params";
import { PRODUCTS_PER_PAGE } from "core/config";
import { FilterQuerySet } from "utils/collections";
import MetaTags from "components/atoms/MetaTags";
import { filtersChangeHandler } from "./utils";
import { useProductsQueryLazy } from "./queries";

import Page from "./Page";
import Breadcrumbs, { getBreadcrumbs } from "components/atoms/Breadcrumbs";
import ProductTile from "components/molecules/ProductTile";

import styles from "./ProductList.module.scss";
import useIsTablet from "hooks/useIsTablet";
import useIsMobile from "hooks/useIsMobile";
import FilterSidebar from "components/organisms/FilterSidebar";
import Button from "components/atoms/Button";

import { icons } from "core/constants";

type AttributeInput = {
  slug: string;
  values: string[];
  valuesRange: any;
  dateTime: any;
  date: any;
  boolean: boolean;
};

const ProductListView: FC<{
  // shop?: any;
  category?: any;
  collection?: string;
  attributes: any[];
}> = ({ category, collection, attributes = [] }) => {
  const [search, setSearch] = useQueryParam("term", StringParam);
  const [perPage, setPerPage] = useQueryParam("perPage", NumberParam);
  const [sort, setSort] = useQueryParam("sortBy", StringParam);
  const [brand, setBrand] = useQueryParam("brand", StringParam);

  const filter: any = {
    search: null,
    categories: [],
    collections: [],
    price: {
      lte: null,
      gte: null,
    },
    attributes: [],
  };
  const sortBy = sort || null;
  const first = perPage || PRODUCTS_PER_PAGE;
  const last = null;
  const before = null;
  const after = null;

  // const brand = {
  //   slug: "brand",
  //   values: ["quooker"],
  // };

  const isTablet = useIsTablet();
  const isMobile = useIsMobile();

  const gridTemplateColumns = isMobile
    ? "repeat(1, 100%)"
    : isTablet
    ? "repeat(2, 50%)"
    : "repeat(4, 25%)";

  if (category) {
    filter.categories.push(category.id);
  }

  if (collection) {
    filter.collections.push(collection);
  }

  if (search) {
    filter.search = search;
  }

  if (brand) {
    filter.attributes.push({
      slug: "brand",
      values: [brand],
    });
  }

  const [getProducts, { data, loading, error }] = useProductsQueryLazy(
    filter,
    first,
    last,
    before,
    after,
    sortBy
  );

  // getProducts();

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const [products, pageInfo, numberOfProducts] = useMemo(
    () => [
      data?.products?.edges.map((e) => e.node) || [],
      data?.products?.pageInfo,
      data?.products?.totalCount || 0,
    ],
    [data]
  );

  // useEffect(() => {

  // }, [data?.products.pageInfo]);

  const scrollTop = () => window.scrollTo(0, 0);

  const [pageIndex, setPageIndex] = useState(1);

  const pageCount = Math.ceil(numberOfProducts / first);

  const pageNext = () => {
    scrollTop();
    setPageIndex(pageIndex + 1);
    getProducts({
      variables: {
        filter,
        first: perPage || PRODUCTS_PER_PAGE,
        last: null,
        before: null,
        after: pageInfo.endCursor,
      },
    });
  };

  const pagePrev = () => {
    scrollTop();
    setPageIndex(pageIndex - 1);
    getProducts({
      variables: {
        filter,
        first: null,
        last: perPage || PRODUCTS_PER_PAGE,
        before: pageInfo.startCursor,
        after: null,
      },
    });
  };

  // const handleSortChange = ({ value }) => setSort(value);
  // const handlePerPageChange = ({ value }) => setPerPage(value);

  // const loadMore = () =>
  //   loadMoreFn(
  //     (prev, next) => ({
  //       products: {
  //         ...prev.products,
  //         edges: [...next.products.edges],
  //         pageInfo: next.products.pageInfo,
  //       },
  //     }),
  //     pageInfo
  //   );

  // const pagePrev = () =>
  //   pagePrevFn(
  //     (prev, next) => ({
  //       products: {
  //         ...prev.products,
  //         edges: [...next.products.edges],
  //         pageInfo: next.products.pageInfo,
  //       },
  //     }),
  //     pageInfo.endCursor
  //   );

  // const [products, pageInfo, numberOfProducts] = useMemo(
  //   () => [
  //     data?.products?.edges.map((e) => e.node) || [],
  //     data?.products?.pageInfo,
  //     data?.products?.totalCount || 0,
  //   ],
  //   [data]
  // );

  // const handleClearFilters = () => setAttributeFilters({});

  // const handleFiltersChange = filtersChangeHandler(
  //   filters,
  //   attributeFilters,
  //   setAttributeFilters
  // );

  // const handleSortChange = ({ value }) => setSort(value);
  // const handlePerPageChange = ({ value }) => setPerPage(value);

  // const handleLoadMore = () => {
  //   return loadMore(
  //     (prev, next) => ({
  //       products: {
  //         ...prev.products,
  //         edges: [...prev.products.edges, ...next.products.edges],
  //         pageInfo: next.products.pageInfo,
  //       },
  //     }),
  //     pageInfo.endCursor
  //   );
  // };

  const placeholders = Array(first).fill(1);

  // const parentCategory = getLevel0Category(category);

  return (
    <div className="container mt-4">
      <h2>{category?.name}</h2>
      {category?.ancestors && (
        <Breadcrumbs
          breadcrumbs={getBreadcrumbs(category, category.ancestors)}
        />
      )}
      {!loading && (
        <>
          {error && <h2>Error</h2>}
          {pageCount < 1 && <span>No products to display.</span>}
        </>
      )}

      <ul
        className={styles.list}
        style={{ gridTemplateColumns, gridAutoRows: "500px" }}
      >
        {products.map((product) => (
          <li key={`product-${product.id}`}>
            <ProductTile product={product} financePromo />
          </li>
        ))}

        {loading &&
          !products.length &&
          placeholders.map((_, index) => (
            <li key={`product-placeholder-${index}`}>
              <ProductTile />
            </li>
          ))}
      </ul>

      {/* <MetaTags
        title={category.details.seoTitle || category.details.name}
        description={category.details.seoDescription}
        meta={{ "og:type": "product.category" }}
      />
      <Page
        {...{
          products,
          category,
          loading,
        }}
        products={products}
        category={category}
        displayLoader={loading}
        parentCategory={parentCategory}
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
      /> */}
      {/* <FilterSidebar
        categories={children}
        attributes={attributes}
        filters={filters}
        activeFilters={activeFilters}
        onAttributeFiltersChange={onAttributeFiltersChange}
        parentCategory={parentCategory}
      /> */}

      {/* <Button label={"page prev"} onClick={pagePrev} /> */}
      <div className={styles.pageIndex}>
        {pageCount > 1 && (
          <Button
            label={"Previous Page"}
            onClick={pagePrev}
            disabled={!pageInfo?.hasPreviousPage}
            icon={icons.faChevronLeft}
          />
        )}

        {pageCount > 0 && (
          <span>
            Showing page {pageIndex} of {pageCount}
          </span>
        )}

        {pageCount > 1 && (
          <Button
            label={"Next Page"}
            onClick={pageNext}
            disabled={!pageInfo?.hasNextPage}
            icon={icons.faChevronRight}
          />
        )}
      </div>
    </div>
  );
};

export default ProductListView;

// const getLevel0Category = (category) => {
//   if (!category.ancestors?.length) return category.details;

//   return category.ancestors[0];
// };
