import { v4 as uuid } from "uuid";
import paths from "core/paths";

const menuConfig = {
  main: [
    {
      id: uuid(),
      name: "About TPD",
      href: paths.about,
    },
    {
      id: uuid(),
      name: "Trade Account",
      href: paths.trade,
    },
    {
      id: uuid(),
      name: "Request a Quote",
      href: paths.requestQuote,
    },
  ],
  kitchens: [
    {
      id: uuid(),
      name: "Shop All",
      href: paths.category.replace("[slug]", "kitchens"),
    },
    {
      id: uuid(),
      name: "Kitchen Ranges",
      href: paths.kitchenRanges,
    },
    {
      id: uuid(),
      name: "Kitchen Inspiration",
      href: paths.kitchens,
    },
    {
      id: uuid(),
      name: "Kitchens on Finance",
      href: paths.finance,
    },
  ],
  bathrooms: [
    {
      id: uuid(),
      name: "Shop All",
      href: paths.category.replace("[slug]", "bathrooms"),
    },
    {
      id: uuid(),
      name: "Bathroom Inspiration",
      href: paths.bathrooms,
    },
    {
      id: uuid(),
      name: "Bathrooms on Finance",
      href: paths.finance,
    },
  ],
  boilers: [
    {
      id: uuid(),
      name: "Shop All",
      href: paths.category.replace("[slug]", "boilers"),
    },
    {
      id: uuid(),
      name: "Boiler Guide",
      href: paths.boilers,
    },
    {
      id: uuid(),
      name: "Boilers on Finance",
      href: paths.finance,
    },
  ],
};

export default menuConfig;
