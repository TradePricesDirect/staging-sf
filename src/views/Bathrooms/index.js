import { v4 as uuid } from "uuid";
import paths from "core/paths";
import { convertRichTextToPlainText } from "core/utils";
import MetaTags from "components/atoms/MetaTags";
import CategoryHero from "components/molecules/CategoryHero";
import CategoryStyles from "components/molecules/CategoryStyles";
import CategoryPopular from "components/molecules/CategoryPopular";
import CategoryCarousel from "components/molecules/CategoryCarousel";
// import FeaturedCarousel from "components/organisms/FeaturedCarousel";
// import FeaturedMultipanel from "components/molecules/FeaturedMultipanel";
// import FeaturedGrohe from "components/molecules/FeaturedGrohe";
// import FeaturedSynergy from "components/molecules/FeaturedSynergy";
import TopBrands from "components/molecules/TopBrands";
import LuxuryGrid from "components/molecules/LuxuryGrid";
import ConsultationCallToAction from "components/organisms/ConsultationCallToAction";
import FeaturedBrands from "components/molecules/FeaturedBrands";
import FAQ from "./FAQ";

import * as config from "./utils";
// import FeaturedPalio from "components/molecules/FeaturedPalio";
// import FeaturedXLJoinery from "components/molecules/FeaturedXLJoinery";

const BathroomsPage = ({ bathrooms, featured, finishingTouches }) => {
  return (
    <>
      <MetaTags
        title="Bathrooms at Trade Prices"
        description={
          bathrooms.seoDescription ||
          convertRichTextToPlainText(bathrooms.description)
        }
      />

      <CategoryHero
        title="Bathrooms"
        description={bathrooms.description}
        backgroundImage={bathrooms.backgroundImage}
      />

      <CategoryStyles
        title="Popular Bathroom Styles"
        viewAll={config.bathroomsUrl}
        slides={config.categoryStyles}
      />

      <CategoryPopular
        title="Inspirational Bathroom Suites"
        description="From stylish contemporary looks to warm, welcoming classics, you can choose from endless options. And only we'll give you trade prices."
        viewAll={config.bathroomsUrl}
        slides={config.suites}
      />

      <CategoryCarousel
        title="Shop Bathroom"
        viewAll={config.bathroomsUrl}
        categories={[
          {
            id: uuid(),
            name: "Shop All",
            slug: "bathrooms",
            backgroundImage: bathrooms.backgroundImage,
          },
          ...featured,
        ]}
      />
      {/* 
      <FeaturedCarousel
        viewAll={config.bathroomsUrl}
        slides={[
          <FeaturedSynergy key="bathrooms-featured-carousel-synergy" />,
          <FeaturedMultipanel key="bathrooms-featured-carousel-multipanel" />,
          <FeaturedGrohe key="bathrooms-featured-carousel-grohe" />,
          <FeaturedPalio key="bathrooms-featured-carousel-palio" />,
          <FeaturedXLJoinery key="bathrooms-featured-carousel-xljoinery" />,
        ]}
      /> */}

      <CategoryCarousel
        title="Shop Finishing Touches"
        viewAll={config.bathroomsUrl}
        categories={finishingTouches}
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
          "/images/bathrooms/luxury-bath.jpg",
          "/images/bathrooms/luxury-shower.jpg",
          "/images/bathrooms/luxury-grohe.jpg",
        ]}
        content={{
          subtitle: "Affordable Options",
          title: "Bathrooms on Finance",
          text: "Luxury doesn't have to cost an arm and a leg. With trade pricing, no deposit finance options and Buy Now Pay Later, you can get the kitchen of your dreams at a price that won't keep you up at night.",
          button: {
            href: paths.finance,
            text: "Bathroom Finance",
          },
        }}
      />

      <ConsultationCallToAction
        subtitle="Design your sanctuary"
        title="Book a Free Virtual Consultation"
        text="Whether you're considering your options or ready to get started, our design team is here to help. Start with a free consultation with no commitment or obligation."
        backgroundImage="/images/bathrooms/bathroom-wireframe.jpg"
      />

      <FAQ />

      <FeaturedBrands brands={config.brands} />
    </>
  );
};

export default BathroomsPage;
