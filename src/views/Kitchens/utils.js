import { v4 as uuid } from "uuid";
import paths from "core/paths";

export const categoryStyles = [
  {
    id: uuid(),
    name: "Traditional",
    href: {
      pathname: paths.kitchenRanges,
      query: { filters: "style_traditional" },
    },
    backgroundImage: {
      url: "/images/kitchens/traditional-thumbnail.jpg",
      alt: "Traditional",
    },
  },
  {
    id: uuid(),
    name: "Shaker",
    href: {
      pathname: paths.kitchenRanges,
      query: { filters: "type_shaker" },
    },
    backgroundImage: {
      url: "/images/kitchens/shaker-thumbnail.jpg",
      alt: "Shaker",
    },
  },
  {
    id: uuid(),
    name: "Modern",
    href: {
      pathname: paths.kitchenRanges,
      query: { filters: "style_modern" },
    },
    backgroundImage: {
      url: "/images/kitchens/modern-thumbnail.jpg",
      alt: "Modern",
    },
  },
  {
    id: uuid(),
    name: "Handleless",
    href: {
      pathname: paths.kitchenRanges,
      query: { filters: "features_handleless" },
    },
    backgroundImage: {
      url: "/images/kitchens/handleless-thumbnail.jpg",
      alt: "Handleless",
    },
  },
];

export const logos = [
  "/images/logos/brand-bosch.png",
  "/images/logos/brand-siemens.png",
  "/images/logos/brand-whirlpool.png",
  "/images/logos/brand-aeg.png",
  "/images/logos/brand-samsung.png",
  "/images/logos/brand-quooker.png",
  "/images/logos/brand-grohe.png",
  "/images/logos/brand-hotpoint.png",
];

export const brands = [
  {
    name: "Quooker",
    href: paths.category.replace("[slug]", "quooker"),
    backgroundImage: "/images/kitchens/featured-quooker.jpg",
  },
  {
    name: "Neff",
    href: paths.category.replace("[slug]", "appliances"),
    backgroundImage: "/images/kitchens/featured-neff.jpg",
  },
  {
    name: "Grohe",
    href: paths.category.replace("[slug]", "kitchens"),
    backgroundImage: "/images/kitchens/featured-grohe.jpg",
  },
];
