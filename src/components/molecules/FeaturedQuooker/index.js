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
      video={
        <iframe
          src="https://player.vimeo.com/video/493772224?h=8de8752009&color=8f132c&title=0&byline=0&portrait=0"
          width="640"
          height="360"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      }
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
