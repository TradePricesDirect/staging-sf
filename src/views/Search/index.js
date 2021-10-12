import { useMemo } from "react";
import { NumberParam, StringParam, useQueryParam } from "use-query-params";
import { PRODUCTS_PER_PAGE } from "core/config";
import MetaTags from "components/atoms/MetaTags";
import Page from "./Page";
import { useProductsSearchQuery } from "./queries";

const SearchPage = () => {
  const [search, setSearch] = useQueryParam("term", StringParam);
  const [perPage, setPerPage] = useQueryParam("perPage", NumberParam);
  const [sort, setSort] = useQueryParam("sortBy", StringParam);

  const filters = {
    search: search,
    priceGte: null,
    priceLte: null,
    sortBy: sort || null,
    perPage: perPage || PRODUCTS_PER_PAGE,
  };

  const { data, loadMore, loading } = useProductsSearchQuery(filters);

  const [products, pageInfo, numberOfProducts] = useMemo(
    () => [
      data?.products?.edges.map((e) => e.node) || [],
      data?.products?.pageInfo,
      data?.products?.totalCount || 0,
    ],
    [data]
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
      <MetaTags title="Search Results" meta={{ "og:type": "product.search" }} />

      <Page
        search={search}
        setSearch={setSearch}
        displayLoader={loading}
        products={products}
        numberOfProducts={numberOfProducts}
        hasNextPage={!!pageInfo?.hasNextPage}
        activeSortOption={filters.sortBy}
        activePerPageOption={filters.perPage}
        onLoadMore={handleLoadMore}
        onSortChange={handleSortChange}
        onPerPage={handlePerPageChange}
      />
    </>
  );
};

export default SearchPage;
