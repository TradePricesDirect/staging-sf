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
import FeaturedPalio from "components/molecules/FeaturedPalio";
import HowItWorks from "./HowItWorks";
import TilesLarge from "./TilesLarge";

const HomePage = ({ categoriesLevel0, categoriesLevel1, totalCounts }) => {
  return (
    <>
      <HomeHero />
      <Tiles />
      <BrandsList totalCounts={totalCounts} />
      <CategoryList categories={categoriesLevel0} />
      <CategoryCarouselEndless categories={categoriesLevel1} />
      <FeaturedCarousel
        viewAll="menu"
        slides={[
          <FeaturedQuooker key="home-featured-slide-quooker" />,
          <FeaturedTado key="home-featured-slide-tado" />,
          <FeaturedMultipanel key="home-featured-slide-multipanel" />,
          <FeaturedSynergy key="home-featured-slide-synergy" />,
          <FeaturedFernox key="home-featured-slide-fernox" />,
          <FeaturedAeg key="home-featured-slide-aeg" />,
          <FeaturedXLJoinery key="home-featured-slide-xljoinery" />,
          <FeaturedVaillant key="home-featured-slide-vaillant" />,
          <FeaturedGrohe key="home-featured-slide-grohe" />,
          <FeaturedPalio key="home-featured-slide-palio" />,
        ]}
      />
      <HowItWorks />
      <FeefoReviews />
      <TilesLarge />
    </>
  );
};

export default HomePage;
