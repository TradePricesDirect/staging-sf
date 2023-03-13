import { PER_PAGE_OPTIONS, SORT_OPTIONS } from "utils/collections";
import Breadcrumbs, { getBreadcrumbs } from "components/atoms/Breadcrumbs";
import ProductListHero from "components/molecules/ProductListHero";
import ProductListHeader from "components/molecules/ProductListHeader";
import ProductList from "components/organisms/ProductList";
import FilterSidebar from "components/organisms/FilterSidebar";
import QuookerContent from "./SEOContent/Quooker";

import MenuNavigation from "layouts/components/MenuSidebar/MenuNavigation";
import styles from "./Page.module.scss";
import { FC } from "react";

const Page: FC<{
  products: any[];
  category: any;
}> = ({
  // displayLoader,
  // category: { attributes, details, ancestors, children },
  // parentCategory,
  category,
  products,
  // numberOfProducts,
  // hasNextPage,
  // filters,
  // activeFilters,
  // activeSortOption,
  // activePerPageOption,
  // onClearFilters,
  // onAttributeFiltersChange,
  // onSortChange,
  // onPerPageChange,
  // onLoadMore,
}) => {
  return (
    <>
      {/* <ProductListHero
        key={details.id}
        title={details.name}
        description={details.description}
        backgroundImage={details.backgroundImage}
      /> */}

      {/* <div className="container-fluid"> */}
      {category?.ancestors && (
        <Breadcrumbs
          breadcrumbs={getBreadcrumbs(category, category.ancestors)}
        />
      )}

      {/* <div className="row"> */}
      {/* <div className="col-lg order-lg-2"> */}
      {/* <ProductListHeader
        numberOfProducts={numberOfProducts}
      /> */}

      {/* <h4 className={styles.header}>{"Products"}</h4>
      <div className={styles.container}> */}
      {/* {children.length > 0 && <MenuNavigation subCategories={children} className={styles.menuNav} />} */}

      {/* <FilterSidebar
          categories={children}
          attributes={attributes}
          filters={filters}
          activeFilters={activeFilters}
          onAttributeFiltersChange={onAttributeFiltersChange}
          parentCategory={parentCategory}
        /> */}
      {/* <ProductList
        products={products}
        // perPage={activePerPageOption}
        // canLoadMore={hasNextPage}
        // loading={displayLoader}
        // onLoadMore={onLoadMore}
        // activeFilters={activeFilters}
        // onClearFilters={onClearFilters}
      /> */}
      {/* </div> */}

      {/* <div className="col-lg-auto order-lg-1">
      </div> */}
      {/* </div> */}
      {/* </div> */}
      {/* </div> */}

      {/* {details.slug === "quooker" && <QuookerContent />} */}
    </>
  );
};

export default Page;
