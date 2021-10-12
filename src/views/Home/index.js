import HomeHero from "./HomeHero";
import Tiles from "./Tiles";
import BrandsList from "components/molecules/BrandsList";
import CategoryList from "components/organisms/CategoryList";
import CategoryCarousel from "components/organisms/CategoryCarousel";
import FeaturedProductsCarousel from "./FeaturedProductsCarousel";
import HowItWorks from "./HowItWorks";
import FeefoReviews from "components/molecules/FeefoReviews";
import TilesLarge from "./TilesLarge";

const HomePage = ({ categories, totalCounts }) => {
  const level0 = categories?.level0?.edges.map((e) => e.node) || [];
  const level1 = categories?.level1?.edges.map((e) => e.node) || [];

  return (
    <>
      <HomeHero />
      <Tiles />
      <BrandsList totalCounts={totalCounts} />
      <CategoryList categories={level0} />
      <CategoryCarousel categories={level1} />
      <FeaturedProductsCarousel />
      <HowItWorks />
      <FeefoReviews />
      <TilesLarge />
    </>
  );
};

export default HomePage;
