const exclude = [
  // Private pages
  "/account",
  "/account/*",
  "/basket",
  "/checkout",
  "/checkout/*",
  "/forgot-password/success",
  "/lists/manage",
  "/register/new-user",
  "/request-quote/thank-you",
  "/thank-you",
  // Kitchen Range collection pages
  "/collection/ascot",
  "/collection/cambridge",
  "/collection/cartmel",
  "/collection/linear-anthracite-mountain-larch",
  "/collection/linear-anthracite-mountain-larch-for-vero-system",
  "/collection/linear-natural-halifax",
  "/collection/linear-natural-halifax-for-vero-system",
  "/collection/linear-natural-kendal",
  "/collection/linear-natural-kendal-for-vero-system",
  "/collection/linear-shorewood",
  "/collection/linear-shorewood-for-vero-system",
  "/collection/linear-truffle-brown-denver",
  "/collection/linear-truffle-brown-denver-for-vero-system",
  "/collection/lucente-gloss",
  "/collection/lucente-matt",
  "/collection/newmarket",
  "/collection/oxford",
  "/collection/stratto",
  "/collection/stratto-for-vero-system",
  "/collection/vivo-gloss",
  "/collection/vivo-gloss-for-vero-system",
  "/collection/vivo-matt",
  "/collection/vivo-matt-for-vero-system",
  "/collection/windsor",
];

const priority = [
  "/",
  "/about",
  "/bathrooms",
  "/boilers",
  "/finance",
  "/kitchens",
  "/kitchen-ranges",
];

const siteUrl = process.env.SITE_URL || "https://tradepricesdirect.com";

module.exports = {
  siteUrl: siteUrl,
  generateRobotsTxt: true,
  exclude: [...exclude, "/server-sitemap.xml"],
  robotsTxtOptions: {
    additionalSitemaps: [`${siteUrl}/server-sitemap.xml`],
  },
  transform: async (config, path) => {
    let defaults = {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };

    // Prioritize paths
    if (priority.includes(path)) return { ...defaults, priority: 1 };

    return defaults;
  },
};
