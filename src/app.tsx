import AppLayout from "./layouts/App";
import ThirdPartyTags from "components/atoms/ThirdPartyTags";
import ShopProvider from "contexts/ShopContext";
import OverlayProvider from "contexts/OverlayContext";
import NProgressBar from "components/atoms/NProgressBar";

const DEFAULT_LAYOUT = (
  page,
  categoryTree,
  footerMenus,
  featuredCategories
) => (
  <AppLayout
    categoryTree={categoryTree}
    footerMenus={footerMenus}
    featuredCategories={featuredCategories}
  >
    {page}
  </AppLayout>
);

const StorefrontApp = ({
  layout,
  shopConfig,
  categoryTree,
  footerMenus,
  featuredCategories,
  children,
}) => {
  const getLayout = layout || DEFAULT_LAYOUT;

  return (
    <ShopProvider shopConfig={shopConfig}>
      <OverlayProvider>
        <NProgressBar />
        <ThirdPartyTags />
        {getLayout(children, categoryTree, footerMenus, featuredCategories)}
      </OverlayProvider>
    </ShopProvider>
  );
};

export default StorefrontApp;
