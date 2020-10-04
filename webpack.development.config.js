const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const utils = require("./build/utils");
const theme = require("./build/theme");
const packageInfo = require("./package.json");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  mode: "development",
  entry: {
    index: "./src/index.js",
    multipleIndex: "./src/multipleIndex.js",
  },
  output: {
    path: resolve("dist"),
    filename: "[name].js",
  },
  resolve: {
    extensions: [".js", ".json"],
    alias: {
      "@": resolve("src"),
    },
  },
  devServer: {
    contentBase: resolve("./"),
    compress: true,
    port: 8080,
    open: true,
    hot: true,
    quiet: true,
  },
  devtool: "eval-source-map",
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        VERSIONS: JSON.stringify(packageInfo.version),
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin(),
    ...["index", "multipleIndex"].map(
      (name) =>
        new HtmlWebpackPlugin({
          filename: `${name}.html`,
          chunks: [name],
          template: "index.dev.html",
        })
    ),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: [resolve("src"), resolve("test")],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
                modifyVars: theme,
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: utils.assetsPath("img/[name].[hash:7].[ext]"),
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: utils.assetsPath("media/[name].[hash:7].[ext]"),
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: utils.assetsPath("fonts/[name].[hash:7].[ext]"),
        },
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "babel-loader",
          },
          {
            loader: "@svgr/webpack",
            options: {
              babel: false,
              icon: true,
            },
          },
        ],
      },
    ],
  },
};
