const paths = {
  // Shop
  home: "/",
  shop: "/shop",
  category: "/category/[slug]",
  collection: "/collection/[slug]",
  search: "/search",
  product: "/product/[slug]",
  page: "/page/[slug]",
  // Legal
  privacy: "/legal/privacy-policy",
  terms: "/legal/terms-conditions",
  // Account
  register: "/register",
  registerNewUser: "/register/new-user",
  login: "/login",
  accountConfirm: "/account-confirm",
  forgotPassword: "/forgot-password",
  forgotPasswordSuccess: "/forgot-password/success",
  passwordReset: "/reset-password",
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
