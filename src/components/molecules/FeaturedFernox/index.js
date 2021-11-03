import {
  faMagnet,
  faMedal,
  faSparkles,
  faStopwatch,
} from "@fortawesome/pro-light-svg-icons";
import paths from "core/paths";
import FeaturedTile from "components/molecules/FeaturedTile";

const ICONS = [
  { label: "Quick Installation", icon: faStopwatch, color: "#BB0000" },
  { label: "Easy Drain", icon: faSparkles, color: "#EF8106" },
  { label: "Magnetic Filtering", icon: faMagnet, color: "#CE0000" },
  { label: "Award Winning", icon: faMedal, color: "#F0BA00" },
];

const FeaturedFernox = () => {
  return (
    <FeaturedTile
      subtitle="Featured Supplier"
      title="Award Winning Filters and Plumbling Consumables"
      image={{
        src: "/images/featured-fernox.jpg",
        width: 1200,
        height: 1184,
      }}
      icons={ICONS}
      button={{
        name: "Shop Fernox",
        href: paths.category.replace("[slug]", "bathrooms"),
      }}
    >
      <p>
        The TF1 Total filter combines hydrocyclonic action with powerful
        Neodymium magnetic assemblies, to remove magnetic and non-magnetic
        contaminants from system water and contain them safely within the
        filter.
      </p>

      <p>
        Utilising a range of high-quality component parts that ensure the filter
        offers optimum performance.
      </p>
    </FeaturedTile>
  );
};

FeaturedFernox.displayName = "Fernox";

export default FeaturedFernox;
