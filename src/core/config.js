import { ssrMode } from "core/constants";

export const PRODUCTS_PER_PAGE = 20;

export const SUPPORT_PHONE = "0333 335 0439";
export const SUPPORT_EMAIL = "hello@tradepricesdirect.com";

export const META_DEFAULTS = {
  title: "Trade Prices Direct",
  description:
    "Buy kitchens, bathrooms, boilers, and more at trade prices direct from the manufacturer.",
  type: "website",
  url: !ssrMode ? window.location.origin : "",
  "og:image": "/branding/og-image.jpg",
};

export const PROVIDERS = {
  DUMMY: {
    id: "mirumee.payments.dummy",
    label: "Dummy",
  },
  STRIPE: {
    id: "saleor.payments.stripe",
    label: "Stripe",
  },
};
