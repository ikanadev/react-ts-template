const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const webpack = require('webpack');

module.exports = {
  entry: './src/index',
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(ttf|woff|woff2|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 7,
              },
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
            },
          },
        ],
      },
      {
        test: /\.css?$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          ecma: 8,
          warnings: false,
          compress: {
            conditionals: true,
            unused: true,
            comparisons: true,
            sequences: true,
            dead_code: true, // eslint-disable-line @typescript-eslint/camelcase
            evaluate: true,
            if_return: true, // eslint-disable-line @typescript-eslint/camelcase
            join_vars: true, // eslint-disable-line @typescript-eslint/camelcase
          },
          output: {
            comments: false,
            beautify: false,
          },
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_classnames: undefined, // eslint-disable-line @typescript-eslint/camelcase
          keep_fnames: false, // eslint-disable-line @typescript-eslint/camelcase
          safari10: false,
        },
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].css',
      chunkFilename: '[id].css',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new CompressionPlugin({
      test: /\.jsx$|\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
};
