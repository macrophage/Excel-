const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

const path = require("path");

module.exports = (env, argv) => {
  const isProd = argv.mode === "production";
  const isDev = !isProd;

  const filename = (extention) =>
    isProd
      ? `[name].[contenthash].bundle.${extention}`
      : `[name].bundle.${extention}`;

  function plugins() {
    const base = [
      new HtmlWebpackPlugin({
        template: "./index.html",
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "src", "wales.ico"),
            to: path.resolve(__dirname, "dist"),
          },
        ],
      }),
      new MiniCssExtractPlugin({
        filename: filename("css"),
      }),
    ];

    if (isDev) {
      base.push(new ESLintPlugin());
    }
    return base;
  }

  return {
    context: path.resolve(__dirname, "src"),
    entry: {
      main: ["core-js/stable", "regenerator-runtime/runtime", "./index.js"],
    },

    output: {
      path: path.resolve(__dirname, "dist"),
      filename: filename("js"),
      clean: true,
    },

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        core: path.resolve(__dirname, "src", "core"),
      },
    },

    devServer: {
      port: 3000,
      // open:true,
      hot: true,
    },
    devtool: isDev && "source-map",

    plugins: plugins(),

    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
      ],
    },
  };
};
