import {
  faSparkles,
  faStopwatch,
  faTemperatureHigh,
  faTurkey,
} from "@fortawesome/pro-light-svg-icons";
import paths from "core/paths";
import FeaturedTile from "components/molecules/FeaturedTile";

const ICONS = [
  { label: "Pre-heat in Minutes", icon: faStopwatch, color: "#DA1F00" },
  { label: "Self Cleaning Technology", icon: faSparkles, color: "#EF850E" },
  { label: "Precision Control", icon: faTemperatureHigh, color: "#FA2901" },
  { label: "Temperature Probe", icon: faTurkey, color: "#E8A800" },
];

const FeaturedAeg = () => {
  return (
    <FeaturedTile
      subtitle="Featured Supplier"
      title="Guarantee Perfect Results this Festive Season"
      image={{
        src: "/images/featured/featured-aeg.jpg",
        width: 1200,
        height: 1071,
      }}
      icons={ICONS}
      button={{
        name: "Shop AEG",
        href: paths.category.replace("[slug]", "ovens"),
      }}
    >
      <p>
        Indulge in incredible baking, grilling, and roasting with a
        multifunction oven from AEG. Whether you're a novice cook or an
        accomplished chef, the built-in probe and superior temperature control
        provide absolute precision.
      </p>

      <p>
        Wow family and friends this festive season with a succulent selection of
        roasts, and desserts - perfect for dinner party banquets and the big day
        itself.
      </p>
    </FeaturedTile>
  );
};

FeaturedAeg.displayName = "AEG";

export default FeaturedAeg;
