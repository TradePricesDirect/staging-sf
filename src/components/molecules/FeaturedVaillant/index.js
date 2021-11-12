import {
  faGlobeAsia,
  faMobile,
  faMoneyBillWaveAlt,
  faTemperatureHot,
} from "@fortawesome/pro-light-svg-icons";
import paths from "core/paths";
import FeaturedTile from "components/molecules/FeaturedTile";

const ICONS = [
  { label: "Smart Heat", icon: faTemperatureHot, color: "#D86A50" },
  { label: "Save Money", icon: faMoneyBillWaveAlt, color: "#1CA128" },
  { label: "Mobile App", icon: faMobile, color: "#2B89D9" },
  { label: "Eco+", icon: faGlobeAsia, color: "#27A716" },
];

const FeaturedVaillant = () => {
  return (
    <FeaturedTile
      subtitle="Featured Product"
      title="Market Leaders in Heating Since 1874"
      image={{
        src: "/images/featured/featured-vaillant.jpg",
        width: 1200,
        height: 1092,
      }}
      icons={ICONS}
      button={{
        name: "Shop Vaillant",
        href: paths.category.replace("[slug]", "boilers"),
      }}
    >
      <p>
        Get a boiler that stands the test of time from a manufacturer you can
        rely on. Vaillant leads the heating sector with highly innovative
        products, extremely efficient world beating products.
      </p>
      <p>Get exclusive prices on Vaillant Boilers at TPD.</p>
    </FeaturedTile>
  );
};

FeaturedVaillant.displayName = "Vaillant";

export default FeaturedVaillant;
