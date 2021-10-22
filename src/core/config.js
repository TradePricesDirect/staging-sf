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

export const PROVIDERS = [
  {
    id: "mirumee.payments.dummy",
    label: "Pay By Finance",
    description:
      "We offer a range of competitive finance options with 0% deposit available.",
    icons: [
      { url: "/icons/payment-klarna.svg", alt: "Klarna" },
      { url: "/icons/payment-propensio.svg", alt: "Propensio" },
    ],
  },
  {
    id: "saleor.payments.stripe",
    label: "Credit/Debit Card",
    description:
      "We accept all major credit and debit cards. Payments are processed securely.",
    icons: [
      { url: "/icons/payment-stripe.svg", alt: "Stripe" },
      { url: "/icons/payment-visa.svg", alt: "Visa" },
      { url: "/icons/payment-mastercard.svg", alt: "Mastercard" },
      { url: "/icons/payment-amex.svg", alt: "Amex" },
    ],
  },
];
