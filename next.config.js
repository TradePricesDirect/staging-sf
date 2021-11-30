module.exports = {
  reactStrictMode: true,

  staticPageGenerationTimeout: 120,

  async redirects() {
    return [
      {
        source: "/category/kitchen-ranges",
        destination: "/kitchen-ranges",
        permanent: true,
      },
    ];
  },

  images: {
    domains: [
      "tradepricesdirect-website.s3.amazonaws.com",
      "app.tradepricesdirect.com",
    ],
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
