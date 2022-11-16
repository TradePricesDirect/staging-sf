import { useMemo } from "react";
import _ from "lodash";
import { AnimatePresence, motion } from "framer-motion";
import { useOverlay } from "contexts/OverlayContext";
import BackLink from "./BackLink";
import SubMenuLink from "./SubMenuLink";
import Menu from "./Menu";
import menuConfig from "./config";

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

const MenuNavigation = ({ categories }) => {
  const overlay = useOverlay();

  const isParent = overlay.type === "menu";

  const items = useMemo(() => {
    switch (overlay.type) {
      case null:
        return [];
      case "menu":
        return getParentMenuItems(categories);
      default:
        return getMenuItems(categories, overlay.type);
    }
  }, [overlay.type]);

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
          {isParent && (
            <>
              <SubMenuLink
                name="Kitchens"
                slug="kitchens"
                onClick={() => overlay.show("kitchens")}
              />

              <SubMenuLink
                name="Bathrooms"
                slug="bathrooms"
                onClick={() => overlay.show("bathrooms")}
              />

              <SubMenuLink
                name="Heating"
                slug="heating"
                onClick={() => overlay.show("heating")}
              />
            </>
          )}

          <Menu items={items} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MenuNavigation;

const getParentMenuItems = (categories) => {
  const EXCLUDE_CATEGORIES = [
    "kitchens",
    "bathrooms",
    "heating",
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
