import {
  faShoePrints,
  faTint,
  faClock,
} from "@fortawesome/pro-light-svg-icons";
import paths from "core/paths";
import FeaturedTile from "components/molecules/FeaturedTile";
import { faTrees } from "@fortawesome/pro-regular-svg-icons";

const ICONS = [
  { label: "Comfortable Feel", icon: faShoePrints, color: "#ca003b" },
  { label: "Realistic Design", icon: faTrees, color: "#27A716" },
  { label: "Waterproof", icon: faTint, color: "#2B89D9" },
  { label: "Quick Fit", icon: faClock, color: "#BB0000" },
];

const FeaturedPalio = () => {
  return (
    <FeaturedTile
      subtitle="Featured Product"
      title="Luxury Vinyl Flooring you can Trust"
      image={{
        src: "/images/featured/featured-palio.jpg",
        width: 1200,
        height: 968,
      }}
      icons={ICONS}
      button={{
        name: "Shop Palio",
        href: paths.category.replace("[slug]", "flooring"),
      }}
    >
      <p>
        Browse our collection of contemporary luxury vinyl wood and stone
        designs cut into individual tiles and planks. Super fast,
        straightforward fitting technology; click it, lay it or stick it.
      </p>
      <p>
        Enjoy the look of realistic natural materials with the jot and
        convenience vinyl. The perfect choice to transform any room.
      </p>
    </FeaturedTile>
  );
};

FeaturedPalio.displayName = "Palio";

export default FeaturedPalio;
