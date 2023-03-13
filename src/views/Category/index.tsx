import MetaTags from "components/atoms/MetaTags";
import Breadcrumbs, { getBreadcrumbs } from "components/atoms/Breadcrumbs";
import CategoryList from "components/organisms/CategoryList";
import MenuNavigation from "layouts/components/MenuSidebar/MenuNavigation";

import styles from "./Category.module.scss";
import useIsMobile from "hooks/useIsMobile";
import useIsTablet from "hooks/useIsTablet";
import clsx from "clsx";

const CategoryView = ({ category }) => {
  const meta = {
    title: category.seoTitle || category.name,
    description: category.seoDescription,
    meta: { "og:type": "product.category" },
  };

  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  return (
    <section className={clsx(styles.container, "container-xxl")}>
      <MetaTags {...meta} />
      <div className={styles.headerContainer}>
        {!isTablet && !isMobile && (
          <Breadcrumbs
            breadcrumbs={getBreadcrumbs(category, category.ancestors)}
          />
        )}
        <h4
          className={clsx(
            styles.header,
            isTablet || isMobile ? styles.center : ""
          )}
        >
          {category.name}
        </h4>
      </div>
      <div className={styles.content}>
        {!isTablet && !isMobile && category.children.length > 0 && (
          <div className={styles.nav}>
            <MenuNavigation
              category={category}
              subCategories={category.children}
              className={styles.menuNav}
            />
          </div>
        )}

        <CategoryList category={category} />
      </div>
    </section>
  );
};

export default CategoryView;
