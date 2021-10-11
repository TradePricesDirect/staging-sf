module.exports = {
  reactStrictMode: true,

  images: {
    domains: ["tradepricesdirect.s3.amazonaws.com"],
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
