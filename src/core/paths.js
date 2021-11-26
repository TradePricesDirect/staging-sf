const paths = {
  // Shop
  home: "/",
  category: "/category/[slug]",
  collection: "/collection/[slug]",
  search: "/search",
  product: "/product/[slug]",
  page: "/[slug]",
  basket: "/basket",
  // Checkout
  checkout: "/checkout",
  checkoutAddress: "/checkout/address",
  checkoutShipping: "/checkout/shipping",
  checkoutPayment: "/checkout/payment",
  checkoutPaymentConfirm: "/checkout/payment-confirm",
  checkoutReview: "/checkout/review",
  orderThankYou: "/thank-you",
  // Kichen Ranges
  kitchenRanges: "/kitchen-ranges",
  kitchenRange: "/kitchen-ranges/[slug]",
  // Legal
  privacy: "/privacy-policy",
  terms: "/terms-conditions",
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
    orders: "/account/order-history",
    order: "/account/order-history/[token]",
    details: "/account/details",
    addresses: "/account/addresses",
    paymentMethods: "/account/payment-methods",
  },
  wishlists: "/lists",
  wishlist: "/lists/[id]",
  wishlistsManage: "/lists/manage",
  // Landing Pages
  kitchens: "/kitchens",
  bathrooms: "/bathrooms",
  boilers: "/boilers",
  trade: "/trade",
  about: "/about",
  finance: "/finance",
  requestQuote: "/request-quote",
  requestQuoteThankYou: "/request-quote/thank-you",
};

export default paths;
