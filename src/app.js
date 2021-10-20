import AppLayout from "layouts/App";
import ShopProvider from "contexts/ShopContext";
import OverlayProvider from "contexts/OverlayContext";
import NProgressBar from "components/atoms/NProgressBar";

const DEFAULT_LAYOUT = (page, menus, footerMenus) => (
  <AppLayout menus={menus} footerMenus={footerMenus}>
    {page}
  </AppLayout>
);

const StorefrontApp = ({
  layout,
  shopConfig,
  menus,
  footerMenus,
  children,
}) => {
  const getLayout = layout || DEFAULT_LAYOUT;

  return (
    <ShopProvider shopConfig={shopConfig}>
      <OverlayProvider>
        <NProgressBar />

        {getLayout(children, menus, footerMenus)}
      </OverlayProvider>
    </ShopProvider>
  );
};

export default StorefrontApp;
