import {
  faArrowsH,
  faRaindrops,
  faSparkles,
} from "@fortawesome/pro-light-svg-icons";
import paths from "core/paths";
import FeaturedTile from "components/molecules/FeaturedTile";

const ICONS = [
  { label: "Wide Head", icon: faArrowsH, color: "#5099D8" },
  { label: "Easy Clean", icon: faSparkles, color: "#79CEF4" },
  { label: "Micro Drops", icon: faRaindrops, color: "#2B89D9" },
];

const FeaturedGrohe = () => {
  return (
    <FeaturedTile
      subtitle="Featured Product"
      title="Bring the Rainforest into your home"
      image={{
        src: "/images/featured/featured-grohe.jpg",
        width: 1200,
        height: 1125,
      }}
      icons={ICONS}
      button={{
        name: "Shop GROHE",
        href: paths.category.replace("[slug]", "showers"),
      }}
    >
      <p>
        All good things come from above, and wall mounted showers from Grohe are
        no exception. Refresh your senses and experience a shower like no other
        with smart controls and purist design.
      </p>
      <p>
        Bring a tropical rain storm into your home and find your perfect
        santuary.
      </p>
    </FeaturedTile>
  );
};

FeaturedGrohe.displayName = "Grohe";

export default FeaturedGrohe;
