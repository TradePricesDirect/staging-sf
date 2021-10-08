import paths from "paths";

const menus = {
  about: {
    title: "About",
    menu: [
      { path: "/", label: "About TPD" },
      { path: "/", label: "How it works" },
      { path: "/", label: "Finance Options" },
      { path: "/", label: "FAQ’s" },
      { path: "/", label: "Careers" },
      { path: "/", label: "Become a Supplier" },
      { path: "/", label: "Become a Fitter" },
      { path: "/", label: "Investors" },
    ],
  },
  support: {
    title: "Support",
    menu: [
      { path: paths.register, label: "Register" },
      { path: paths.account.dashboard, label: "My Account" },
      { path: paths.account.orders, label: "My Orders" },
      { path: paths.wishlists, label: "My Lists" },
      { path: "/", label: "Return of Replace Items" },
      { path: "/", label: "Help Centre" },
      { path: "/", label: "Delivery Information" },
      { path: "/", label: "Return Policy" },
    ],
  },
  shop: {
    title: "Shop",
    menu: [
      { path: "/", label: "Trade Price Kitchens" },
      { path: "/", label: "Trade Price Bathrooms" },
      { path: "/", label: "Trade Price Boilers" },
      { path: "/", label: "Kitchen Inspiration" },
      { path: "/", label: "Bathroom Inspiration" },
      { path: "/", label: "Boiler Guides" },
      { path: "/", label: "Free Site Survey" },
      { path: "/", label: "Free Kitchen Plan" },
    ],
  },
};

export default menus;
