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

const FeaturedTado = () => {
  return (
    <FeaturedTile
      subtitle="Featured Product"
      title="Save Energy & Stay Comfortable"
      image={{
        src: "/images/featured/featured-tado.jpg",
        width: 1200,
        height: 770,
      }}
      icons={ICONS}
      button={{
        name: "Shop Tado",
        href: {
          pathname: paths.category.replace("[slug]", "thermostats"),
          query: { filters: "brand_tado" },
        },
      }}
    >
      <p>
        Make your radiators smart. Save energy and maximise comfort. Available
        with vertical or horizontal mounting.
      </p>
      <p>
        Control your radiators in every room, whether you heat with your own
        boiler or district heating. tado° is compatible with almost all radiator
        valves.
      </p>
    </FeaturedTile>
  );
};

FeaturedTado.displayName = "Tado";

export default FeaturedTado;
