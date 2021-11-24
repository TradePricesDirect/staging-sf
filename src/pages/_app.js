import NextApp from "next/app";
import { SaleorProvider } from "@saleor/sdk";
import { apiUrl, channelSlug } from "core/constants";
import { getCategoryTree, getFooterMenus, getShopConfig } from "utils/ssr";
import { NextQueryParamProvider } from "contexts/NextQueryParamProvider";
import StorefrontApp from "../app";

import "@fortawesome/fontawesome-svg-core/styles.css";
import "react-loading-skeleton/dist/skeleton.css";
import "styles/global.scss";

const saleorConfig = { apiUrl, channel: channelSlug };

const App = ({
  Component,
  pageProps,
  shopConfig,
  categoryTree,
  footerMenus,
}) => {
  return (
    <NextQueryParamProvider>
      <SaleorProvider config={saleorConfig}>
        <StorefrontApp
          layout={Component.getLayout}
          shopConfig={shopConfig}
          categoryTree={categoryTree}
          footerMenus={footerMenus}
        >
          <Component {...pageProps} />
        </StorefrontApp>
      </SaleorProvider>
    </NextQueryParamProvider>
  );
};

// Fetch shop config only once and cache it.
App.getInitialProps = async (appContext) => {
  const appProps = await NextApp.getInitialProps(appContext);

  const shopConfig = await getShopConfig();
  const footerMenus = await getFooterMenus();
  const categoryTree = await getCategoryTree();

  return { ...appProps, shopConfig, footerMenus, categoryTree };
};

export default App;
