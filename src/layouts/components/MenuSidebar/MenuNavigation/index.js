import { useMemo } from "react";
import _ from "lodash";
import { AnimatePresence, motion } from "framer-motion";
import { useOverlay } from "contexts/OverlayContext";
import BackLink from "./BackLink";
import SubMenuLink from "./SubMenuLink";
import Menu from "./Menu";
import menuConfig from "./config";
import formatSlug from "utils/formatSlug";

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

const MenuNavigation = ({ categories, featuredCategories }) => {
  const overlay = useOverlay();

  const isParent = overlay.type === "menu";

  const items = useMemo(() => {
    switch (overlay.type) {
      case null:
        return [];
      case "menu":
        return getParentMenuItems(categories, featuredCategories);
      default:
        return getMenuItems(categories, overlay.type);
    }
  }, [overlay.type, categories, featuredCategories]);

  const featured = useMemo(() =>
    getFeaturedCategories(categories, featuredCategories),
    [categories, featuredCategories]);

  return (
    <div className="flex-grow-1">
      {!isParent && <BackLink onClick={() => overlay.show("menu")} />}

      <AnimatePresence>
        <motion.div
          key={overlay.type}
          custom={isParent}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={variant}
          transition={{ ease: "easeOut", duration: 0.2 }}
        >
          {isParent && featured.map(category =>
            <SubMenuLink
              name={category.name}
              slug={category.slug}
              onClick={() => overlay.show(category.slug)}
              key={`submenu-link-${category.slug}`}
            />
          )}
          <Menu items={items} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MenuNavigation;


const getFeaturedCategories = (categories, featuredCategories) => {
  // backwards way of filtering to preserve the original array order (could probably be improved)
  return featuredCategories.map(slug => categories.filter(category => category.slug === slug)[0]).filter(index => index);
}

const getParentMenuItems = (categories, featuredCategories) => {
  const EXCLUDE_CATEGORIES = [
    ...featuredCategories,
    "kitchen-ranges",
  ];

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
