import HomeHero from "./HomeHero";
import Tiles from "./Tiles";
import BrandsList from "components/molecules/BrandsList";
import CategoryList from "components/organisms/CategoryList";
import CategoryCarouselEndless from "components/organisms/CategoryCarouselEndless";
import FeaturedCarousel from "components/organisms/FeaturedCarousel";
import FeefoReviews from "components/molecules/FeefoReviews";
import FeaturedQuooker from "components/molecules/FeaturedQuooker";
import FeaturedTado from "components/molecules/FeaturedTado";
import FeaturedMultipanel from "components/molecules/FeaturedMultipanel";
import FeaturedSynergy from "components/molecules/FeaturedSynergy";
import FeaturedFernox from "components/molecules/FeaturedFernox";
import FeaturedAeg from "components/molecules/FeaturedAeg";
import FeaturedXLJoinery from "components/molecules/FeaturedXLJoinery";
import FeaturedVaillant from "components/molecules/FeaturedVaillant";
import FeaturedGrohe from "components/molecules/FeaturedGrohe";
import HowItWorks from "./HowItWorks";
import TilesLarge from "./TilesLarge";
import paths from "core/paths";

const HomePage = ({ categories, totalCounts }) => {
  const level0 = categories?.level0?.edges.map((e) => e.node) || [];
  const level1 = categories?.level1?.edges.map((e) => e.node) || [];

  return (
    <>
      <HomeHero />
      <Tiles />
      <BrandsList totalCounts={totalCounts} />
      <CategoryList categories={level0} />
      <CategoryCarouselEndless categories={level1} />
      <FeaturedCarousel
        viewAll={paths.shop}
        slides={[
          <FeaturedQuooker />,
          <FeaturedTado />,
          <FeaturedMultipanel />,
          <FeaturedSynergy />,
          <FeaturedFernox />,
          <FeaturedAeg />,
          <FeaturedXLJoinery />,
          <FeaturedVaillant />,
          <FeaturedGrohe />,
        ]}
      />
      <HowItWorks />
      <FeefoReviews />
      <TilesLarge />
    </>
  );
};

export default HomePage;
