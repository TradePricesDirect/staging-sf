const { withSentryConfig } = require("@sentry/nextjs");

const moduleExports = {
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

const sentryWebpackPluginOptions = {
  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
