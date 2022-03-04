const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const utils = require('./build/utils');
const theme = require('./build/theme');
const HtmlWebpackInlineSourcePlugin = require('./build/InlineChunkHtmlPlugin');

const packageInfo = require('./package.json');
function resolve(dir) {
  return path.join(__dirname, dir);
}

const packageReplaceString = '<<<JEST-HTML-REPLACE-PLACEHOLDER>>>';

module.exports = {
  mode: 'production',
  entry: {
    index: './src/index.js',
  },
  output: {
    path: resolve('dist'),
    publicPath: packageReplaceString,
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': resolve('src'),
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        VERSIONS: JSON.stringify(packageInfo.version),
        PLACEHOLDER: JSON.stringify(packageReplaceString),
      },
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ...['index', 'singleFile'].map(
      (name) =>
        new HtmlWebpackPlugin({
          filename: `${name}.html`,
          chunks: 'index',
          template: `./templates/${name}.html`,
          inlineSource: name === 'singleFile' ? '.(js|css)$' : undefined,
        })
    ),
    // Copyright
    new webpack.BannerPlugin('Copyright Harry All rights reserved.'),
    // new BundleAnalyzerPlugin(),
    new HtmlWebpackInlineSourcePlugin(HtmlWebpackPlugin, [/s/]),
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        uglifyOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true,
          },
        },
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
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
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]'),
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]'),
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]'),
        },
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: '@svgr/webpack',
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
