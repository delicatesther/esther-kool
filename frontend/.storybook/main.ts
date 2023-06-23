import type { StorybookConfig } from "@storybook/nextjs";
const config: StorybookConfig = {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions", 'storybook-dark-mode'],
  staticDirs: ["../public"],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  core: {
    disableTelemetry: true
  },
  webpackFinal: async (config) => {
    // This modifies the existing image rule to exclude .svg files
    // since you want to handle those files with @svgr/webpack
    // @ts-ignore
    const imageRule = config.module.rules.find((rule) => rule.test && rule.test.test(".svg"));
    (imageRule as any).exclude = /\.svg$/;
    // Configure .svg files to be loaded with @svgr/webpack
    config?.module?.rules?.push(
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
      //TO DO: make it a common config in webpack.common.js since Next is also needing it (see next.config.js)
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: "graphql-tag/loader",
      },
    );
    return config;
  },
};
export default config;
