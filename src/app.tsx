import AppLayout from "./layouts/App";
import ThirdPartyTags from "components/atoms/ThirdPartyTags";
import ShopProvider from "contexts/ShopContext";
import OverlayProvider from "contexts/OverlayContext";
import NProgressBar from "components/atoms/NProgressBar";

const DEFAULT_LAYOUT = (page, categoryTree, footerMenus) => (
  <AppLayout categoryTree={categoryTree} footerMenus={footerMenus}>
    {page}
  </AppLayout>
);

const StorefrontApp = ({
  layout,
  shopConfig,
  categoryTree,
  footerMenus,
  children,
}) => {
  const getLayout = layout || DEFAULT_LAYOUT;

  return (
    <ShopProvider shopConfig={shopConfig}>
      <OverlayProvider>
        <NProgressBar />
        <ThirdPartyTags />
        {getLayout(children, categoryTree, footerMenus)}
      </OverlayProvider>
    </ShopProvider>
  );
};

export default StorefrontApp;
