import { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-dark-mode",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: false,
  },
  // Ref: https://storybook.js.org/docs/react/builders/webpack#override-the-default-configuration
  webpackFinal: async (config) => {
    let updatedConfig = config;
    if (updatedConfig.module?.rules !== undefined) {
      updatedConfig.module.rules.push({
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "javascript/auto", // Ref: https://webpack.js.org/guides/asset-modules/
        use: [
          {
            loader: "responsive-loader",
            options: {
              adapter: require("responsive-loader/sharp"),
              sizes: [300, 450, 600, 900, 1200],
              outputPath: "image-assets",
              esModule: true,
              format: "webp",
            },
          },
        ],
      });
    }
    return updatedConfig;
  },
};
export default config;
