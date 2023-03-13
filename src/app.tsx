import AppLayout from "./layouts/App";
import ThirdPartyTags from "components/atoms/ThirdPartyTags";
import ShopProvider from "contexts/ShopContext";
import OverlayProvider from "contexts/OverlayContext";
import NProgressBar from "components/atoms/NProgressBar";

const DEFAULT_LAYOUT = (page, footerMenus, categories, featuredCategories) => {
  return (
    <AppLayout
      footerMenus={footerMenus}
      categories={categories}
      featuredCategories={featuredCategories}
    >
      {page}
    </AppLayout>
  );
};

const StorefrontApp = ({
  layout,
  shopConfig,
  footerMenus,
  categories,
  featuredCategories,
  children,
}) => {
  const getLayout = layout || DEFAULT_LAYOUT;
  return (
    <ShopProvider shopConfig={shopConfig}>
      <OverlayProvider>
        <NProgressBar />
        <ThirdPartyTags />
        {getLayout(children, footerMenus, categories, featuredCategories)}
      </OverlayProvider>
    </ShopProvider>
  );
};

export default StorefrontApp;
