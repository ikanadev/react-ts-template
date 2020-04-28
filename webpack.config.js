const path = require('path');
const webpack = require('webpack');

const HtmlWebPackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  entry: './src/index',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle-dev.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.(ttf|woff|woff2|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/,
        loaders: ['file-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      /*{
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },*/
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  devtool: 'inline-source-map',
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
  ],
  devServer: {
    historyApiFallback: true,
  },
};
