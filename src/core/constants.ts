export const apiUrl: string = process.env.NEXT_PUBLIC_API_URI as string;

export const channelSlug = process.env.NEXT_PUBLIC_SALEOR_CHANNEL_SLUG;

export const ssrMode = typeof window === "undefined";

export const incrementalStaticRegenerationRevalidate = parseInt(
  process.env.INCREMENTAL_STATIC_REGENERATION_REVALIDATE as string,
  10
);

export const staticPathsFetchBatch = 100;

type Brand = {
  id: string;
  name: string;
  slug: string;
  backgroundImage: {
    alt: string;
    url: string;
  };
};

const brandNames = ["Quooker", "Siemens"];

export const brands: Brand[] = brandNames.map((brandName) => {
  const id = brandName.toLowerCase().replaceAll(" ", "-").replaceAll("'", "");
  return {
    id,
    name: brandName,
    slug: id,
    backgroundImage: {
      alt: brandName,
      url: `https://tradepricesdirect-website.s3.amazonaws.com/brand-logos/${id}.svg`,
    },
  };
});

import {
  faSync,
  faStar,
  faTruck,
  faFileContract,
  faArrowRight,
  faArrowLeft,
  faTemperatureFrigid,
  faTemperatureHigh,
  faSparkles,
  faRaindrops,
  faMoneyBill,
  faMobile,
  faRecycle,
  faShippingFast,
  faSignIn,
  faChevronRight,
  faChevronLeft,
  faUser,
  faHeart,
  faShoppingBasket,
  faBars,
  faSpinner,
  faPlus,
  faTrash,
  faMinus,
  faEdit,
  faQuestionCircle,
  faPhoneAlt,
  faEye,
  faAngleRight,
  faSearch,
  faPlay,
  faLockAlt,
  faEnvelope,
  faPiggyBank,
  faSignOut,
  faPhone,
  faBoxOpen,
  faAddressBook,
  faInfoSquare,
  faCreditCard,
  faPoundSign,
  faCog,
  faShare,
  faEllipsisV,
} from "@fortawesome/pro-regular-svg-icons";

export const icons: any = {
  faSync,
  faStar,
  faTruck,
  faFileContract,
  faArrowRight,
  faArrowLeft,
  faTemperatureFrigid,
  faTemperatureHigh,
  faSparkles,
  faRaindrops,
  faMoneyBill,
  faMobile,
  faRecycle,
  faShippingFast,
  faSignIn,
  faChevronRight,
  faChevronLeft,
  faUser,
  faHeart,
  faShoppingBasket,
  faBars,
  faSpinner,
  faPlus,
  faTrash,
  faMinus,
  faEdit,
  faQuestionCircle,
  faPhoneAlt,
  faEye,
  faAngleRight,
  faSearch,
  faPlay,
  faLockAlt,
  faEnvelope,
  faPiggyBank,
  faSignOut,
  faPhone,
  faBoxOpen,
  faAddressBook,
  faInfoSquare,
  faCreditCard,
  faPoundSign,
  faCog,
  faShare,
  faEllipsisV,
};

export const featureIcons = {
  boiling: {
    label: "Boiling",
    icon: faTemperatureHigh,
    color: "#cb0238",
  },
  cold: {
    label: "Cold",
    icon: faTemperatureFrigid,
    color: "#5ca2dc",
  },
  sparkling: {
    label: "Sparkling",
    icon: faSparkles,
    color: "#7ed0f5",
  },
  filtered: {
    label: "Filtered",
    icon: faRaindrops,
    color: "#3c93dd",
  },
  smartHeat: {
    label: "Smart Heat",
    icon: faTemperatureHigh,
    color: "#cb0238",
  },
  saveMoney: {
    label: "Save Money",
    icon: faMoneyBill,
    color: "#019a68",
  },
  mobileApp: {
    label: "Mobile App",
    icon: faMobile,
    color: "#000000",
  },
  ecoPlus: {
    label: "Eco+",
    icon: faRecycle,
    color: "#0ab3af",
  },
};
