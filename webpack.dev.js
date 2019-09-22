/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

process.env.NODE_ENV = 'development';

module.exports = {
  mode: 'development',
  target: 'web',
  devtool: 'inline-source-map',
  entry: './src/web/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.API_URL': JSON.stringify('http://localhost:7001'),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/web', 'index.html'),
      favicon: path.resolve(__dirname, 'src/web', 'favicon.ico'),
      filename: 'index.html',
    }),
    new webpack.EnvironmentPlugin({
      AUTH0_DOMAIN: 'royk.auth0.com',
      AUTH0_CLIENT_ID: 'J5Mu7fSFraTWgQBz1WJgikpnuRnKRkaL',
      AUTH0_CALLBACK_URL: 'http://localhost:7000/callback',
      AUTH0_AUDIENCE: 'http://localhost:7001',
      API_URL: 'http://localhost:7001',
      API_PORT: 7001,
    }),
  ],
  devServer: {
    stats: 'minimal',
    overlay: true,
    historyApiFallback: true,
    disableHostCheck: true,
    contentBase: './dist',
    headers: {
      'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    },
    https: false,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
              ],
              plugins: [
                '@babel/plugin-syntax-dynamic-import',
                '@babel/plugin-proposal-class-properties',
              ],
            },
          },
          {
            loader: 'eslint-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
