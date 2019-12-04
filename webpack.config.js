/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const merge = require('webpack-merge');

module.exports = (env) => {
  const mode = env === 'dev' ? 'development' : 'production';
  console.log(`This is a ${mode} build`);

  const baseConfig = {
    mode,
    devtool: 'source-map',
    node: {
      __dirname: true,
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    plugins: [
      new webpack.EnvironmentPlugin({
        RELEASE_ENV: env,
      }),
    ],
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: ['babel-loader', 'eslint-loader'],
        },
      ],
    },
  };

  const webConfig = {
    target: 'web',
    entry: {
      app: path.resolve(__dirname, './src/web/index.js'),
    },
    output: {
      path: path.resolve(__dirname, 'dist/public'),
      filename: '[name].bundle.js',
    },
    context: path.resolve(__dirname),
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/web', 'index.html'),
        favicon: path.resolve(__dirname, 'src/web', 'favicon.ico'),
        filename: 'index.html',
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.html$/,
          use: ['html-loader'],
        },
      ],
    },
  };
  const nodeConfig = {
    target: 'node',
    entry: {
      server: path.resolve(__dirname, './src/server/index.js'),
    },
    externals: [nodeExternals()],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js',
      sourceMapFilename: '[name].bundle.js.map',
    },
    context: path.resolve(__dirname),
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/web', 'index.html'),
        favicon: path.resolve(__dirname, 'src/web', 'favicon.ico'),
        filename: 'index.html',
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['css-loader'],
        },
        {
          test: /\.html$/,
          use: ['html-loader'],
        },
      ],
    },
  };

  const frontPack = merge(
    webConfig,
    baseConfig,
  );
  const backPack = merge(
    nodeConfig,
    baseConfig,
  );

  return [frontPack, backPack];
};
