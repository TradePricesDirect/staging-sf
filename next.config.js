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
    domains: ["s3.amazonaws.com"],
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

module.exports = moduleExports;

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
