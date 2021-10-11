import AppLayout from "layouts/App";
import ShopProvider from "contexts/ShopContext";
import OverlayProvider from "contexts/OverlayContext";
import NProgressBar from "components/atoms/NProgressBar";

const defaultLayout = (page) => <AppLayout>{page}</AppLayout>;

const StorefrontApp = ({ layout, shopConfig, children }) => {
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
