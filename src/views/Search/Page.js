import { PER_PAGE_OPTIONS, SORT_OPTIONS } from "utils/collections";
import Breadcrumbs from "components/atoms/Breadcrumbs";
import ProductListHeader from "components/molecules/ProductListHeader";
import ProductList from "components/organisms/ProductList";
import paths from "core/paths";
import SearchHero from "./SearchHero";

const populateBreadcrumbs = (term) => [
  {
    href: { pathname: paths.search, query: { term } },
    name: `You searched for: ${term}`,
  },
];

const Page = ({
  displayLoader,
  search,
  setSearch,
  products,
  numberOfProducts,
  hasNextPage,
  activeSortOption,
  activePerPageOption,
  onSortChange,
  onPerPageChange,
  onLoadMore,
}) => {
  return (
    <>
      <SearchHero search={search} setSearch={setSearch} />

      <div className="container-fluid">
        <ProductListHeader
          numberOfProducts={numberOfProducts}
          renderBreadcrumb={
            <Breadcrumbs breadcrumbs={populateBreadcrumbs(search)} />
          }
          // activeSortOption={activeSortOption}
          // sortOptions={SORT_OPTIONS}
          // onSortChange={onSortChange}
          // activePerPageOption={activePerPageOption}
          // perPageOptions={PER_PAGE_OPTIONS}
          // onPerPageChange={onPerPageChange}
        />

        <ProductList
          products={products}
          perPage={activePerPageOption}
          canLoadMore={hasNextPage}
          loading={displayLoader}
          onLoadMore={onLoadMore}
        />
      </div>
    </>
  );
};

export default Page;
