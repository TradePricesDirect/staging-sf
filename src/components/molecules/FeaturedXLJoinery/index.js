import {
  faBadge,
  faFlag,
  faTools,
  faVolumeMute,
} from "@fortawesome/pro-light-svg-icons";
import paths from "core/paths";
import FeaturedTile from "components/molecules/FeaturedTile";

const ICONS = [
  { label: "Made in England", icon: faFlag, color: "#CE001D" },
  { label: "Hand Crafted", icon: faTools, color: "#DC960B" },
  { label: "Sound Proofed", icon: faVolumeMute, color: "#00284C" },
  { label: "Manufacturer Guarantee", icon: faBadge, color: "#46A900" },
];

const FeaturedXLJoinery = () => {
  return (
    <FeaturedTile
      subtitle="Featured Supplier"
      title="Swing Open Savings on British Built Doors"
      image={{
        src: "/images/featured/featured-xl-joinery.jpg",
        width: 1200,
        height: 997,
      }}
      icons={ICONS}
      button={{
        name: "Shop XL Joinery",
        href: paths.category.replace("[slug]", "doors"),
      }}
    >
      <p>
        XL Joinery combine sustainably sourced wood with style and substance.
        Having crafted and engineered, high quality doors in Yorkshire for over
        25 years XL Joinery have built a legacy of craftmentship and quality you
        can trust will last for a lifetime.
      </p>
      <p>So get your foot in the door and let the savings come knocking.</p>
    </FeaturedTile>
  );
};

FeaturedXLJoinery.displayName = "XL Joinery";

export default FeaturedXLJoinery;
