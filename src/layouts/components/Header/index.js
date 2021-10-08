import clsx from "clsx";
import Logo from "components/atoms/Logo";
import SearchForm from "components/molecules/SearchForm";
import MenuButton from "./MenuButton";
import Navigation from "./Navigation";
import Icons from "./Icons";

import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header id="masthead" className={styles.wrap}>
      <div className={clsx("container-xxl", styles.container)}>
        <MenuButton />

        <div className={styles.logoWrap}>
          <Logo className={styles.logo} />
        </div>

        <Navigation />

        <div className={styles.search}>
          <SearchForm id="site-search" />
        </div>

        <Icons />
      </div>
    </header>
  );
};

export default Header;
