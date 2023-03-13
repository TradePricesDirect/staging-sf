import BaseLayout from "layouts/Base";
import Header from "layouts/components/Header";
import Subfooter from "layouts/components/Subfooter";
import Footer from "layouts/components/Footer";
import CartSidebar from "layouts/components/CartSidebar";
import MenuSidebar from "layouts/components/MenuSidebar";
import styles from "./App.module.scss";
import clsx from "clsx";


const AppLayout = ({ footerMenus, children, categories, featuredCategories }) => (
  <BaseLayout>
    <Header {...{ categories, featuredCategories }} />

    <main id="main" className={clsx(styles.noScroll, styles.container)}>{children}</main>

    <Subfooter />
    <Footer menus={footerMenus} />

    <CartSidebar />
    <MenuSidebar  {...{ categories, featuredCategories }} />
  </BaseLayout>
);

export default AppLayout;
