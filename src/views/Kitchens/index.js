import { v4 as uuid } from "uuid";
import paths from "core/paths";
import { convertRichTextToPlainText } from "core/utils";
import MetaTags from "components/atoms/MetaTags";
import CategoryHero from "components/molecules/CategoryHero";
import CategoryStyles from "components/molecules/CategoryStyles";
import KitchenRangesPopular from "components/molecules/KitchenRangesPopular";
import CategoryCarousel from "components/molecules/CategoryCarousel";
import FeaturedCarousel from "components/organisms/FeaturedCarousel";
import FeaturedQuooker from "components/molecules/FeaturedQuooker";
import FeaturedAeg from "components/molecules/FeaturedAeg";
import TopBrands from "components/molecules/TopBrands";
import LuxuryGrid from "components/molecules/LuxuryGrid";
import ConsultationCallToAction from "components/organisms/ConsultationCallToAction";
import FeaturedBrands from "components/molecules/FeaturedBrands";
import FAQs from "./FAQs";

import * as config from "./utils";
import FeaturedXLJoinery from "components/molecules/FeaturedXLJoinery";
import FeaturedPalio from "components/molecules/FeaturedPalio";

const KitchensPage = ({ ranges, kitchens, appliances, finishingTouches }) => {
  return (
    <>
      <MetaTags
        title="Kitchens at Trade Prices"
        description={
          kitchens.seoDescription ||
          convertRichTextToPlainText(kitchens.description)
        }
      />

      <CategoryHero
        title="Fitted Kitchens & Appliances"
        description={kitchens.description}
        backgroundImage={kitchens.backgroundImage}
      />

      <CategoryStyles
        title="Kitchens By Style"
        viewAll={paths.kitchenRanges}
        slides={config.categoryStyles}
      />

      <KitchenRangesPopular
        title="Browse Most Popular Kitchens"
        description="From stylish contemporary looks to warm, welcoming classics, you can choose from over 30 kitchen door styles in over 100 colours. And only we'll give you trade prices."
        viewAll={paths.kitchenRanges}
        ranges={ranges}
      />

      <CategoryCarousel
        title="Shop Appliances"
        viewAll={paths.category.replace("[slug]", "appliances")}
        categories={[
          {
            id: uuid(),
            name: "Shop All",
            slug: "appliances",
            backgroundImage: kitchens.backgroundImage,
          },
          ...appliances,
        ]}
      />

      <FeaturedCarousel
        slides={[
          <FeaturedQuooker />,
          <FeaturedAeg />,
          <FeaturedXLJoinery />,
          <FeaturedPalio />,
        ]}
      />

      <CategoryCarousel
        title="Shop Finishing Touches"
        viewAll={paths.category.replace("[slug]", "kitchens")}
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
          "/images/kitchens/luxury-quooker.jpg",
          "/images/kitchens/luxury-wine-cooler.jpg",
          "/images/kitchens/luxury-coffee.jpg",
        ]}
        content={{
          subtitle: "Affordable Options",
          title: "Kitchens on Finance",
          text: "Luxury doesn’t have to cost an arm and a leg. With trade pricing, no deposit finance options and Buy Now Pay Later, you can get the kitchen of your dreams at a price that won’t keep you up at night.",
          button: {
            href: paths.finance,
            text: "Kitchen Finance",
          },
        }}
      />

      <ConsultationCallToAction
        subtitle="Talk to the experts in incredible kitchens"
        title="Book a Free Virtual Consultation"
        text="Whether you're considering your options or ready to get started, our design team is here to help. Start with a free consultation with no commitment or obligation."
        backgroundImage="/images/kitchens/kitchen-wireframe.jpg"
      />

      <FAQs />

      <FeaturedBrands brands={config.brands} />
    </>
  );
};

export default KitchensPage;
