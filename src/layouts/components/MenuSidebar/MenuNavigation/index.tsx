import { FC, useMemo } from "react";
import _ from "lodash";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useOverlay } from "contexts/OverlayContext";
import BackLink from "./BackLink";
import SubMenuLink from "./SubMenuLink";
import Menu from "./Menu";
import menuConfig from "./config";
import getFeaturedCategories from "utils/getFeaturedCategories";

import styles from "./MenuNavigation.module.scss";
import MenuContactDetails from "../MenuContactDetails";
import { useRouter } from "next/router";
import clsx from "clsx";

const variant = {
  hidden: (isParent) => ({
    position: "absolute",
    visibility: "hidden",
    x: isParent ? "-15%" : "15%",
  }),
  visible: {
    position: "static",
    visibility: "visible",
    x: 0,
  },
};

const MenuNavigation: FC<{
  category?: any;
  categories?: any[];
  featuredCategories?: any[];
  subCategories?: any[];
  sidebar?: boolean;
  className?: string;
}> = ({
  category,
  categories = [],
  featuredCategories = [],
  subCategories = [],
  sidebar,
  className,
}) => {
  const overlay = useOverlay();
  const isRoot = overlay.type === "menu";
  const isHidden = overlay.type !== null;

  const slug = useRouter().query.slug;

  const items = useMemo(() => {
    switch (overlay.type) {
      case null:
        if (subCategories) {
          return subCategories;
        }
        return [];
      case "menu":
        return getParentMenuItems(categories, featuredCategories);
      default:
        return getMenuItems(categories, overlay.type);
    }
  }, [overlay.type, categories, featuredCategories]);

  const featured = useMemo(
    () => getFeaturedCategories(categories, featuredCategories),
    [categories, featuredCategories]
  );

  return (
    <>
      {/* {!isRoot && <BackLink />} */}
      <AnimatePresence>
        <motion.div
          key={overlay.type}
          custom={isRoot}
          initial={sidebar ? "hidden" : ""}
          animate="visible"
          exit="hidden"
          variants={variant as Variants}
          transition={{ ease: "easeOut", duration: 0.2 }}
        >
          <nav className={clsx(styles.nav, className)}>
            {sidebar && (isRoot || !isHidden) && (
              <ul className={styles.featured}>
                {featured?.map((category) => (
                  <li key={`submenu-link-${category.slug}`}>
                    <SubMenuLink
                      name={category.name}
                      slug={category.slug}
                      onClick={() => overlay.show(category.slug)}
                    />
                  </li>
                ))}
              </ul>
            )}

            <Menu category={category} items={items} sidebar={sidebar} />
            {sidebar && <MenuContactDetails />}
          </nav>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default MenuNavigation;

const getParentMenuItems = (categories, featuredCategories) => {
  const EXCLUDE_CATEGORIES = [...featuredCategories, "kitchen-ranges"];

  const items = categories.filter(
    ({ slug }) => !EXCLUDE_CATEGORIES.includes(slug)
  );

  return [...(menuConfig.main || []), ...items];
};

const getMenuItems = (categories, slug) => {
  const category = _.find(categories, ["slug", slug]);

  const config = menuConfig[slug] || [];
  const children = category?.children || [];

  return [...config, ...children];
};
