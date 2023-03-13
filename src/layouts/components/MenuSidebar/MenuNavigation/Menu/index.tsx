import Link from "next/link";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import paths from "core/paths";
import useDisclosure from "hooks/useDisclosure";

import _ from "lodash";

import styles from "./Menu.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "core/constants";
import Image from "next/image";
import { FC, useState } from "react";
import { useOverlay } from "contexts/OverlayContext";

const Menu: FC<{
  items: any[];
  sidebar?: boolean;
  className?: string;
  category: any;
}> = ({ items, sidebar, className, category }) => {
  const overlay = useOverlay();
  const isParent = overlay.type === "menu";

  const isHidden = overlay.type === null;

  return (
    <>
      {sidebar && (
        <ul className={styles.featureMenu}>
          {items.map((item) => {
            return (
              <>
                {item?.__typename !== "Category" && (
                  <li key={item.id}>
                    <FeatureLink item={item} />
                  </li>
                )}
              </>
            );
          })}
        </ul>
      )}

      <ul className={styles.menu}>
        {!sidebar && (
          <li>
            <Link
              href={paths.plp.replace("[slug]", category.slug)}
              className={styles.link}
            >
              {"Shop All "}
              {category.name}
            </Link>
          </li>
        )}

        {items.map((item) => {
          return (
            <>
              {item?.__typename === "Category" && (
                <li key={item.id}>
                  <CategoryLink {...item} />
                </li>
              )}
            </>
          );
        })}
      </ul>
    </>
  );
};

export default Menu;

const CategoryLink = ({ name, backgroundImage, children, slug }) => {
  const { isOpen, onToggle } = useDisclosure();

  // this should direct to listing page
  // const url = paths.category.replace("[slug]", slug);

  const hasChildren = _.size(children) > 0;

  const handleClick = (e) => {
    onToggle();
    e.preventDefault();
  };

  if (hasChildren) {
    const url = paths.category.replace("[slug]", slug);
    return (
      <>
        <SubCategoryButton
          name={name}
          onClick={handleClick}
          isOpen={isOpen}
          image={backgroundImage}
        />
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className={styles.submenu}
              style={{ overflow: "hidden" }}
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
            >
              <ul className={styles.list}>
                <li>
                  <Link href={url} className={styles.link}>
                    {"Shop "}
                    {name}
                  </Link>
                </li>
                {children.map((child) => (
                  <li key={child.id}>
                    <CategoryLink {...child} />
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  const url = paths.plp.replace("[slug]", slug);

  return (
    <Link href={url} className={styles.link}>
      <span>{name}</span>
    </Link>
  );
};

const SubCategoryButton = ({ name, onClick, isOpen, image }) => {
  return (
    <button className={styles.subCategoryLink} onClick={onClick}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.image}>
            {image && (
              <>
                <div className={styles.background}></div>
                <Image fill src={image?.url} alt={image?.alt} />
              </>
            )}
          </div>
          <span className={styles.text}>{name}</span>
        </div>
        <span className={styles.chevron}>
          {isOpen ? (
            <FontAwesomeIcon icon={icons.faChevronDown} />
          ) : (
            <FontAwesomeIcon icon={icons.faChevronRight} />
          )}
        </span>
      </div>
    </button>
  );
};

const FeatureLink = ({ item: { name, href } }) => {
  return (
    <Link href={href} className={styles.featureLink}>
      <span className={styles.text}>{name}</span>
      <span className={styles.chevron}>
        <FontAwesomeIcon icon={icons.faChevronRight} />
      </span>
    </Link>
  );
};
