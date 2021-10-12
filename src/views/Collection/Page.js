import { PER_PAGE_OPTIONS, SORT_OPTIONS } from "utils/collections";
import Breadcrumbs, { extractBreadcrumbs } from "components/atoms/Breadcrumbs";
import ProductListHero from "components/molecules/ProductListHero";
import ProductListHeader from "components/molecules/ProductListHeader";
import ProductList from "components/organisms/ProductList";
import FilterSidebar from "components/organisms/FilterSidebar";

const Page = ({
  displayLoader,
  collection: { details, attributes },
  products,
  numberOfProducts,
  hasNextPage,
  filters,
  activeFilters,
  activeSortOption,
  activePerPageOption,
  onClearFilters,
  onAttributeFiltersChange,
  onSortChange,
  onPerPageChange,
  onLoadMore,
}) => {
  return (
    <>
      <ProductListHero
        title={details.name}
        description={details.description}
        backgroundImage={details.backgroundImage}
      />

      <div className="container-fluid">
        <div className="row">
          <div className="col-lg order-lg-2">
            <ProductListHeader
              numberOfProducts={numberOfProducts}
              renderBreadcrumb={
                <Breadcrumbs breadcrumbs={extractBreadcrumbs(details)} />
              }
              // onClearFilters={onClearFilters}
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
              activeFilters={activeFilters}
              onClearFilters={onClearFilters}
            />
          </div>

          <div className="col-lg-auto order-lg-1">
            <FilterSidebar
              attributes={attributes}
              filters={filters}
              onAttributeFiltersChange={onAttributeFiltersChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
