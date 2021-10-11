import AppLayout from "layouts/App";
import ShopProvider from "contexts/ShopContext";
import OverlayProvider from "contexts/OverlayContext";
import NProgressBar from "components/atoms/NProgressBar";

const StorefrontApp = ({
  layout,
  shopConfig,
  menus,
  footerMenus,
  children,
}) => {
  const defaultLayout = (page) => (
    <AppLayout menus={menus} footerMenus={footerMenus}>
      {page}
    </AppLayout>
  );
  const getLayout = layout || defaultLayout;

  return (
    <ShopProvider shopConfig={shopConfig}>
      <OverlayProvider>
        <NProgressBar />

        {getLayout(children)}
      </OverlayProvider>
    </ShopProvider>
  );
};

export default StorefrontApp;
