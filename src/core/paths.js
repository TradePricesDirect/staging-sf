const paths = {
  // Shop
  home: "/",
  shop: "/shop",
  category: "/category/[slug]",
  product: "/product/[slug]",
  // Legal
  privacy: "/legal/privacy-policy",
  terms: "/legal/terms-conditions",
  // Account
  register: "/auth/login",
  login: "/auth/login",
  account: {
    dashboard: "/account",
    orders: "/account/orders",
    details: "/account/details",
    addresses: "/account/addresses",
    addressAdd: "/account/addresses/add",
    address: "/account/addresses/edit/[id]",
    paymentMethods: "/account/payment-methods",
  },
  wishlists: "/lists",
  wishlist: "/lists/[id]",
  // Landing Pages
  trade: "/trade",
  commercial: "/commercial",
  finance: "/finance",
  requestQuote: "/request-quote",
};

export default paths;
