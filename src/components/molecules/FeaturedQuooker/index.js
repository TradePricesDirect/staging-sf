import {
  faRaindrops,
  faSparkles,
  faTemperatureFrigid,
  faThermometerFull,
} from "@fortawesome/pro-light-svg-icons";
import paths from "core/paths";
import FeaturedTile from "components/molecules/FeaturedTile";

const ICONS = [
  { label: "Boiling", icon: faThermometerFull, color: "#ca003b" },
  { label: "Cold", icon: faTemperatureFrigid, color: "#5099d8" },
  { label: "Sparkling", icon: faSparkles, color: "#79cef4" },
  { label: "Filtered", icon: faRaindrops, color: "#2b89d9" },
];

const FeaturedQuooker = () => {
  return (
    <FeaturedTile
      subtitle="Featured Product"
      title="Pure Convenience at Unbeatable Prices"
      image={{
        src: "/images/featured/featured-quooker.jpg",
        width: 1200,
        height: 968,
      }}
      icons={ICONS}
      button={{
        name: "Shop Quooker",
        href: paths.category.replace("[slug]", "quooker"),
      }}
    >
      <p>
        Hot, cold, sparkling and filtered water on demand, this tap from Quooker
        has become an indispensable tool in kitchens all over the world.
      </p>
      <p>
        Get exclusive pricing on the Quooker range of products when you shop
        with Trade Prices Direct.
      </p>
    </FeaturedTile>
  );
};

FeaturedQuooker.displayName = "Quooker";

export default FeaturedQuooker;
