module.exports = {
  reactStrictMode: true,

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
    domains: ["tradepricesdirect.s3.amazonaws.com"],
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
