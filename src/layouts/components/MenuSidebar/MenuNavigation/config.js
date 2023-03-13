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
      href: paths.register,
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
      href: paths.plp.replace("[slug]", "kitchens"),
    },
    {
      id: uuid(),
      name: "Kitchen Ranges",
      href: paths.kitchenRanges,
    },
    {
      id: uuid(),
      name: "Kitchen Inspiration",
      href: paths.content.kitchens,
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
      href: paths.plp.replace("[slug]", "bathrooms"),
    },
    {
      id: uuid(),
      name: "Bathroom Inspiration",
      href: paths.content.bathrooms,
    },
    {
      id: uuid(),
      name: "Bathrooms on Finance",
      href: paths.finance,
    },
  ],
  heating: [
    {
      id: uuid(),
      name: "Shop All",
      href: paths.plp.replace("[slug]", "heating"),
    },
    {
      id: uuid(),
      name: "Heating Guide",
      href: paths.content.heating,
    },
    {
      id: uuid(),
      name: "Heating on Finance",
      href: paths.finance,
    },
  ],
  plumbing: [
    {
      id: uuid(),
      name: "Shop All",
      href: paths.plp.replace("[slug]", "plumbing"),
    },
    {
      id: uuid(),
      name: "Plumbing Guide",
      href: paths.content.plumbing,
    },
    {
      id: uuid(),
      name: "Plumbing on Finance",
      href: paths.finance,
    },
  ],
  renewables: [
    {
      id: uuid(),
      name: "Shop All",
      href: paths.plp.replace("[slug]", "renewables"),
    },
    {
      id: uuid(),
      name: "Renewables Guide",
      href: paths.content.renewables,
    },
    {
      id: uuid(),
      name: "Renewables on Finance",
      href: paths.finance,
    },
  ],
};

export default menuConfig;
