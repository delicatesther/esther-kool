const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

// These settings are copied to both next.config.js and .storybook/main.js
module.exports = {
  resolve: {
    plugins: [
      new TsconfigPathsPlugin(),
    ],
    fallback: {
      assert: false,
      fs: false,
      crypto: false,
    },
  },
};
