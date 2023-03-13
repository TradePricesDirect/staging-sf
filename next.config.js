const contentPages = [
  "kitchens",
  "bathrooms",
  "heating",
  "plumbing",
  "renewables",
  "finance",
  "quote-success"];

module.exports = {
  reactStrictMode: false,
  staticPageGenerationTimeout: 120,
  images: {
    domains: [
      "tradepricesdirect-website.s3.amazonaws.com",
      "app.tradepricesdirect.com",
      "a.storyblok.com",
    ],
  },
  async redirects() {
    return [
      ...contentPages.map(page => ({
        source: `/${page}`,
        destination: `/c/${page}`,
        permanent: true
      }))
    ]
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    config.module.rules.push({
      test: /\.mjml$/,
      use: ["mjml-loader"],
    });

    return config;
  },
};
