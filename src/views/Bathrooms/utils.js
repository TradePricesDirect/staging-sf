import { v4 as uuid } from "uuid";
import paths from "core/paths";

export const bathroomsUrl = paths.category.replace("[slug]", "bathrooms");

export const categoryStyles = [
  {
    id: uuid(),
    name: "Modern",
    href: bathroomsUrl,
    backgroundImage: {
      url: "/images/bathrooms/modern-thumbnail.jpg",
      alt: "Modern",
    },
  },
  {
    id: uuid(),
    name: "Traditional",
    href: bathroomsUrl,
    backgroundImage: {
      url: "/images/bathrooms/traditional-thumbnail.jpg",
      alt: "Traditional",
    },
  },
  {
    id: uuid(),
    name: "Industrial",
    href: bathroomsUrl,
    backgroundImage: {
      url: "/images/bathrooms/industrial-thumbnail.jpg",
      alt: "Industrial",
    },
  },
  {
    id: uuid(),
    name: "Contemporary",
    href: bathroomsUrl,
    backgroundImage: {
      url: "/images/bathrooms/contemporary-thumbnail.jpg",
      alt: "Contemporary",
    },
  },
];

export const suites = [
  {
    id: uuid(),
    name: "Alba Graphite",
    href: { pathname: bathroomsUrl, query: { filters: "range_alba" } },
    image: "/images/bathrooms/alba-graphite.jpg",
  },
  {
    id: uuid(),
    name: "Alba Grey",
    href: { pathname: bathroomsUrl, query: { filters: "range_alba" } },
    image: "/images/bathrooms/alba-grey.jpg",
  },
  {
    id: uuid(),
    name: "Alba Nebraska",
    href: { pathname: bathroomsUrl, query: { filters: "range_alba" } },
    image: "/images/bathrooms/alba-nebraska.jpg",
  },
  {
    id: uuid(),
    name: "Alba White",
    href: { pathname: bathroomsUrl, query: { filters: "range_alba" } },
    image: "/images/bathrooms/alba-white.jpg",
  },
  {
    id: uuid(),
    name: "Benita",
    href: { pathname: bathroomsUrl, query: { filters: "range_benita" } },
    image: "/images/bathrooms/benita-white.jpg",
  },
  {
    id: uuid(),
    name: "Morina Grey",
    href: { pathname: bathroomsUrl, query: { filters: "range_morina" } },
    image: "/images/bathrooms/morina-grey.jpg",
  },
  {
    id: uuid(),
    name: "Morina Urban Grey",
    href: { pathname: bathroomsUrl, query: { filters: "range_morina" } },
    image: "/images/bathrooms/morina-urban-grey.jpg",
  },
  {
    id: uuid(),
    name: "Perla Marble",
    href: { pathname: bathroomsUrl, query: { filters: "range_perla" } },
    image: "/images/bathrooms/perla-marble.jpg",
  },
  {
    id: uuid(),
    name: "Statement White",
    href: { pathname: bathroomsUrl, query: { filters: "range_statement" } },
    image: "/images/bathrooms/statement-white.jpg",
  },
  {
    id: uuid(),
    name: "Valesso Onyx Grey",
    href: { pathname: bathroomsUrl, query: { filters: "range_valesso" } },
    image: "/images/bathrooms/valesso-onyx-grey.jpg",
  },
  {
    id: uuid(),
    name: "Valesso White Gloss",
    href: { pathname: bathroomsUrl, query: { filters: "range_valesso" } },
    image: "/images/bathrooms/valesso-whitegloss.jpg",
  },
  {
    id: uuid(),
    name: "Volta Anthracite",
    href: { pathname: bathroomsUrl, query: { filters: "range_volta" } },
    image: "/images/bathrooms/volta-anthracite.jpg",
  },
  {
    id: uuid(),
    name: "Volta Grey",
    href: { pathname: bathroomsUrl, query: { filters: "range_volta" } },
    image: "/images/bathrooms/volta-grey.jpg",
  },
];

export const logos = [
  "/images/logos/brand-ideal-standard.png",
  "/images/logos/brand-kaldewei.png",
  "/images/logos/brand-multipanel.png",
  "/images/logos/brand-grohe.png",
  "/images/logos/brand-mcalpine.png",
  "/images/logos/brand-geberit.png",
];

export const brands = [
  {
    name: "Grohe",
    href: paths.category.replace("[slug]", "bathrooms"),
    backgroundImage: "/images/bathrooms/featured-grohe1.jpg",
  },
  {
    name: "Kaldewei",
    href: paths.category.replace("[slug]", "bathrooms"),
    backgroundImage: "/images/bathrooms/featured-kaldewei.jpg",
  },
  {
    name: "Grohe",
    href: paths.category.replace("[slug]", "bathrooms"),
    backgroundImage: "/images/bathrooms/featured-grohe2.jpg",
  },
];
