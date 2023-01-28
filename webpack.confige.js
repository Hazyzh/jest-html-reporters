const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const utils = require('./build/utils');
const HtmlWebpackInlineSourcePlugin = require('./build/InlineChunkHtmlPlugin');

const packageInfo = require('./package.json');
function resolve(dir) {
  return path.join(__dirname, dir);
}

const packageReplaceString = '<<<JEST-HTML-REPLACE-PLACEHOLDER>>>';

module.exports = {
  mode: 'production',
  entry: {
    index: './src/index.tsx',
  },
  output: {
    path: resolve('dist'),
    publicPath: packageReplaceString,
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx'],
    alias: {
      '@interfaces': resolve('src/interfaces'),
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
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          ecma: 6,
        },
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
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
