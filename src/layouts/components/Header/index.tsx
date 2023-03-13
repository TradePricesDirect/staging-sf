import clsx from "clsx";
import Logo from "components/atoms/Logo";
import SearchForm from "components/molecules/SearchForm";
import MenuButton from "./MenuButton";
import Navigation from "./Navigation";
import Icons from "./Icons";

import styles from "./Header.module.scss";
import font from "../../../core/fonts";
import useIsTablet from "hooks/useIsTablet";
import useIsMobile from "hooks/useIsMobile";
import { FC } from "react";

const Header: FC<{
  categories: any;
  featuredCategories: any;
  className?: string;
}> = ({ categories, featuredCategories, className }) => {
  const { row, nav, fluid } = styles;
  const isTablet = useIsTablet();
  const isMobile = useIsMobile();

  return (
    <header className={clsx(styles.header, className)}>
      <div className={clsx(row, isTablet || isMobile ? "" : fluid)}>
        {!isTablet && !isMobile && (
          <div className={styles.menu}>
            <MenuButton />
          </div>
        )}
        <Logo link />

        {!isTablet && !isMobile && (
          <div
            className={styles.search}
            style={{ margin: !isTablet && !isMobile && "0 80px" }}
          >
            <SearchForm />
          </div>
        )}

        <Icons />
      </div>

      <div className={clsx(row, nav)}>
        {!isTablet && !isMobile ? (
          <Navigation {...{ categories, featuredCategories }} />
        ) : (
          <div className={styles.search}>
            <SearchForm />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
