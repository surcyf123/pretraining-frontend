/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { GenerateSW } = require("workbox-webpack-plugin");

module.exports = (env) => {
  let plugins = [
    new CopyPlugin({
      // Needs to come before HtmlWebpackPlugin
      patterns: [
        { from: "./src/favicon.ico" },
        { from: "./src/pwa.webmanifest" },
        { from: "./src/icon-192.png" },
        { from: "./src/icon-512.png" },
      ],
    }),
    new HtmlWebpackPlugin({
      template: path.join(process.cwd(), "./src/index.ejs"),
      scriptLoading: "defer",
    }),
  ];

  if (env.production === true) {
    plugins = [
      ...plugins,
      new GenerateSW({
        maximumFileSizeToCacheInBytes: 10e6, // ~ 10MB
        exclude: [/\.d\.ts$/, /\.d\.ts\.map$/],
        runtimeCaching: [{ urlPattern: () => true, handler: "NetworkFirst" }], // Ref: https://developer.chrome.com/docs/workbox/modules/workbox-strategies/
      }),
    ];
  }

  return {
    entry: "./src/index.tsx",
    target: "web",
    mode: env.production === true ? "production" : "development",
    devtool: env.production === true ? undefined : "eval", // Ref: https://webpack.js.org/configuration/devtool/#devtool
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: "ts-loader",
            },
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
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
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    devServer: {
      hot: true,
      open: true,
      historyApiFallback: true, // From https://stackoverflow.com/a/43212553
    },
    watchOptions: {
      ignored: /node_modules/,
    },
    output: {
      path: path.resolve(__dirname, "dist/bundle"),
      filename: "bundle.js",
      publicPath: "/", // Ref: https://stackoverflow.com/a/43212553
    },
    plugins,
  };
};
