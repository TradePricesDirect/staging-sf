import {
  faBadge,
  faShower,
  faSparkles,
  faStopwatch,
} from "@fortawesome/pro-light-svg-icons";
import paths from "core/paths";
import FeaturedTile from "components/molecules/FeaturedTile";

const ICONS = [
  { label: "Quick Installation", icon: faStopwatch, color: "#BB0000" },
  { label: "Easy Clean", icon: faSparkles, color: "#EF8106" },
  { label: "Waterproof", icon: faShower, color: "#00284C" },
  { label: "30 Year Warranty", icon: faBadge, color: "#00B229" },
];

const FeaturedMultipanel = () => {
  return (
    <FeaturedTile
      subtitle="Featured Product"
      title="Meet the Modern Alternative to Tiles"
      image={{
        src: "/images/featured/featured-multipanel.jpg",
        width: 1200,
        height: 970,
      }}
      icons={ICONS}
      button={{
        name: "Shop Multipanel",
        href: {
          pathname: paths.category.replace("[slug]", "flooring"),
          query: { filters: "brand_multipanel" },
        },
      }}
    >
      <p>
        Create beautiful wall spaces waterproof wall panels, the luxurious and
        modern way to decorate your bathroom.
      </p>
      <p>
        Available in a range of sizes and finishes, allowing you to reinvent
        your bathroom in a style that is uniquely yours.
      </p>
    </FeaturedTile>
  );
};

FeaturedMultipanel.displayName = "Multipanel";

export default FeaturedMultipanel;
