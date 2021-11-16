import { v4 as uuid } from "uuid";
import paths from "core/paths";
import MetaTags from "components/atoms/MetaTags";
import CategoryHero from "components/molecules/CategoryHero";
import CategoryStyles from "components/molecules/CategoryStyles";
import CategoryCarousel from "components/molecules/CategoryCarousel";
import FeaturedCarousel from "components/organisms/FeaturedCarousel";
import FeaturedVaillant from "components/molecules/FeaturedVaillant";
import FeaturedTado from "components/molecules/FeaturedTado";
import FeaturedFernox from "components/molecules/FeaturedFernox";
import TopBrands from "components/molecules/TopBrands";
import LuxuryGrid from "components/molecules/LuxuryGrid";
import ConsultationCallToAction from "components/organisms/ConsultationCallToAction";
import FeaturedBrands from "components/molecules/FeaturedBrands";
import FAQs from "./FAQs";
import Intro from "./Intro";

import * as config from "./utils";

const BoilersPage = ({ boilerTypes, heating, consumables }) => {
  return (
    <>
      <MetaTags
        title="Boilers at Trade Prices"
        description="Boilers at Trade Prices"
      />

      <CategoryHero
        title="Boilers"
        description="Boilers at Trade Prices"
        // backgroundImage="/images/boilers/category-hero.jpg"
      />

      <CategoryStyles
        title="Boilers By Fuel Type"
        viewAll={config.boilersUrl}
        slides={config.boilerTypes}
      />

      <Intro />

      <CategoryCarousel
        title="Shop by Boiler Type"
        viewAll={config.boilersUrl}
        categories={[
          { id: uuid(), name: "Shop All", slug: "boilers" },
          ...boilerTypes,
        ]}
      />

      <CategoryCarousel
        title="Shop Heating & Controls"
        viewAll={config.boilersUrl}
        categories={heating}
      />

      <FeaturedCarousel
        slides={[<FeaturedVaillant />, <FeaturedTado />, <FeaturedFernox />]}
      />

      <CategoryCarousel
        title="Shop Boiler Consumables"
        viewAll={config.boilersUrl}
        categories={consumables}
      />

      <TopBrands
        title="Top Brands at Low Prices"
        subtitle="Shop brands you know, at prices you'll love..."
        logos={config.logos}
      />

      <LuxuryGrid
        title="Indulge in Luxury at Trade Prices"
        subtitle="When you're buying at trade prices you don't have to compromise..."
        images={[
          "/images/boilers/luxury-1.jpg",
          "/images/boilers/luxury-2.jpg",
          "/images/boilers/luxury-3.jpg",
        ]}
        content={{
          subtitle: "Affordable Options",
          title: "Boilers on Finance",
          text: "Luxury doesn't have to cost an arm and a leg. With trade pricing, no deposit finance options and Buy Now Pay Later, you can get a smart heating system at a price that won't keep you up at night.",
          button: {
            href: paths.finance,
            text: "Boiler Finance",
          },
        }}
      />

      <ConsultationCallToAction
        subtitle="All Day Everyday"
        title="24/7 Emergency Boiler Repair"
        text="Our certified engingeers have the skills to handle any emergency boiler repair. If it can't be fixed we offer next day shipping on a huge selection of boilers. So you'll never be left in the cold."
        backgroundImage="/images/boilers/boiler-repair-bg.jpg"
      />

      <FAQs />

      <FeaturedBrands brands={config.brands} />
    </>
  );
};

export default BoilersPage;
