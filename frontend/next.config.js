/** @type {import('next').NextConfig} */
const baseConfig = require("./webpack.common.js");

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  publicRuntimeConfig: {
    GRAPHQL_ENDPOINT: process.env.GRAPHQL_ENDPOINT,
  },
  webpack(config, options) {
    baseConfig,
      config.module.rules.push({
        test: /\.svg$/,
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              svgo: false,
              titleProp: true,
            },
          },
        ],
      });
    // Important: return the modified config
    return config;
  },
};

module.exports = nextConfig;
