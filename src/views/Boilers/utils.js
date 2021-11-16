import { v4 as uuid } from "uuid";
import paths from "core/paths";

export const boilersUrl = paths.category.replace("[slug]", "boilers");

export const boilerTypes = [
  {
    id: uuid(),
    name: "Gas",
    href: {
      pathname: boilersUrl,
      query: { filters: "type_gas" },
    },
    backgroundImage: {
      url: "/images/boilers/gas-thumbnail.jpg",
      alt: "Gas",
    },
  },
  {
    id: uuid(),
    name: "LPG",
    href: {
      pathname: boilersUrl,
      query: { filters: "type_lpg" },
    },
    backgroundImage: {
      url: "/images/boilers/lpg-thumbnail.jpg",
      alt: "LPG",
    },
  },
  {
    id: uuid(),
    name: "Oil",
    href: {
      pathname: boilersUrl,
      query: { filters: "type_oil" },
    },
    backgroundImage: {
      url: "/images/boilers/oil-thumbnail.jpg",
      alt: "Oil",
    },
  },
  {
    id: uuid(),
    name: "Electric",
    href: {
      pathname: boilersUrl,
      query: { filters: "type_electric" },
    },
    backgroundImage: {
      url: "/images/boilers/electric-thumbnail.jpg",
      alt: "Electric",
    },
  },
];

export const logos = [
  "/images/logos/brand-vaillant.png",
  "/images/logos/brand-tado.png",
  "/images/logos/brand-glow-worm.png",
  "/images/logos/brand-zanussi.png",
  "/images/logos/brand-viessmann.png",
  "/images/logos/brand-fernox.png",
  "/images/logos/brand-warmhaus.png",
  "/images/logos/brand-hive.png",
];

export const brands = [
  {
    name: "Tado",
    href: {
      pathname: paths.category.replace("[slug]", "thermostats"),
      query: { filters: "brand_tado" },
    },
    backgroundImage: "/images/boilers/featured-tado.jpg",
  },
  {
    name: "Vaillant",
    href: paths.category.replace("[slug]", "boilers"),
    backgroundImage: "/images/boilers/featured-vaillant.jpg",
  },
  {
    name: "Hive",
    href: paths.category.replace("[slug]", "thermostats"),
    backgroundImage: "/images/boilers/featured-hive.jpg",
  },
];
