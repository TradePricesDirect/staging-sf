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

export const inspirationalImages = [
  "/images/bathrooms/inspirational-1.jpg",
  "/images/bathrooms/inspirational-2.jpg",
  "/images/bathrooms/inspirational-3.jpg",
];

export const logos = [
  "/images/logos/brand-gressi.png",
  "/images/logos/brand-ideal-standard.png",
  "/images/logos/brand-kaldewei.png",
  "/images/logos/brand-multipanel.png",
  "/images/logos/brand-grohe.png",
  "/images/logos/brand-mcalpine.png",
  "/images/logos/brand-geberit.png",
];

export const brands = [
  {
    name: "Gessi",
    href: paths.category.replace("[slug]", "bathrooms"),
    backgroundImage: "/images/bathrooms/featured-gressi.jpg",
  },
  {
    name: "Multipanel",
    href: paths.category.replace("[slug]", "bathrooms"),
    backgroundImage: "/images/bathrooms/featured-multipanel.jpg",
  },
  {
    name: "Grohe",
    href: paths.category.replace("[slug]", "bathrooms"),
    backgroundImage: "/images/bathrooms/featured-grohe.jpg",
  },
];
