import React from "react";
import NextApp from "next/app";
import { SaleorProvider } from "@saleor/sdk";
import { apiUrl, channelSlug } from "core/constants";
import Bugsnag from "utils/bugsnag";
import {
  // getCategoriesByLevel,
  getCategories,
  getFeaturedCategories,
  getFooterMenus,
  getShopConfig,
} from "utils/ssr";
import { usePageViewTracking } from "utils/gtm";
import { NextQueryParamProvider } from "contexts/NextQueryParamProvider";
import StorefrontApp from "../app";
import { storyblokInit, apiPlugin } from "@storyblok/react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "react-loading-skeleton/dist/skeleton.css";
import "styles/global.scss";
import { ConfigInput } from "@saleor/sdk/lib/types";
import Page from "components/organisms/Page";
import Grid from "views/Home/Grid";
import Carousel from "components/organisms/Carousel";
import Section from "components/organisms/Section";
import PromoGridTile from "views/Home/PromoGridTile";
import IconGridTile from "views/Home/IconGridTile/IconGridTile";
import HowItWorksGridTile from "views/Home/HowItWorksGridTile/HowItWorksGridTile";
import PromoCarouselTile from "components/molecules/PromoCarouselTile";
import FeatureCarouselTile from "components/molecules/FeatureCarouselTile";
import FeatureCarousel from "components/organisms/FeatureCarousel";
import FinanceGridTile from "components/molecules/FinanceGridTile/FinanceGridTile";
import FAQ from "views/Finance/FAQ";
import Accordion from "components/molecules/Accordion";
import Calculator from "views/Finance/Calculator";
import Button from "components/atoms/Button";

const components = {
  page: Page,
  Grid: Grid,
  Carousel: Carousel,
  DataCarousel: Carousel,
  FeatureCarousel: FeatureCarousel,
  Section: Section,
  PromoGridTile: PromoGridTile,
  IconGridTile: IconGridTile,
  HowItWorksGridTile: HowItWorksGridTile,
  PromoCarouselTile: PromoCarouselTile,
  FeatureCarouselTile: FeatureCarouselTile,
  FinanceGridTile: FinanceGridTile,
  FAQ: FAQ,
  Accordion: Accordion,
  Calculator: Calculator,
  Button: Button,
};
storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_CONTENT_API_TOKEN,
  apiOptions: {
    oauthToken: process.env.NEXT_PUBLIC_STORYBLOK_API_MANAGEMENT_API_TOKEN,
    cache: {
      clear: "auto",
      type: "memory",
    },
  },
  use: [apiPlugin],
  components,
});

const saleorConfig: ConfigInput = {
  apiUrl: apiUrl || "",
  channel: channelSlug,
};

const ErrorBoundary: any =
  Bugsnag?.getPlugin("react")?.createErrorBoundary(React);

const App = ({
  Component,
  pageProps,
  shopConfig,
  categories,
  footerMenus,
  featuredCategories,
}) => {
  usePageViewTracking();

  return (
    <ErrorBoundary>
      <NextQueryParamProvider>
        <SaleorProvider config={saleorConfig}>
          <StorefrontApp
            layout={Component.getLayout}
            shopConfig={shopConfig}
            footerMenus={footerMenus}
            categories={categories}
            featuredCategories={featuredCategories}
          >
            <Component {...pageProps} />
          </StorefrontApp>
        </SaleorProvider>
      </NextQueryParamProvider>
    </ErrorBoundary>
  );
};

// Fetch shop config only once and cache it.
App.getInitialProps = async (appContext) => {
  const appProps = await NextApp.getInitialProps(appContext);

  const shopConfig = await getShopConfig();
  const footerMenus = await getFooterMenus();
  const categories = await getCategories();
  const featuredCategories = await getFeaturedCategories();

  return {
    ...appProps,
    shopConfig,
    footerMenus,
    categories,
    featuredCategories,
  };
};

export default App;
