/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');

module.exports = (env) => {
  const mode = env === 'development' ? 'development' : 'production';
  console.log(`This is a ${mode} build`);

  const baseConfig = {
    mode,
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js',
    },
    devtool: 'source-map',
    node: {
      __dirname: true,
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
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
      ],
    },
  };
  const nodeConfig = {
    target: 'node',
    entry: {
      server: path.resolve(__dirname, './src/server/index.js'),
    },
    context: path.resolve(__dirname, 'src/server'),
  };

  let devServerConfig = {};
  if (mode === 'development') {
    devServerConfig = {
      devServer: {
        stats: 'minimal',
        overlay: true,
        historyApiFallback: true,
        disableHostCheck: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        },
        https: false,
        contentBase: path.resolve(__dirname, 'dist'),
        watchContentBase: false,
        hotOnly: true,
      },
      plugins: [
        new webpack.HotModuleReplacementPlugin(),
      ],
    };
  }

  const frontPack = merge(
    webConfig,
    baseConfig,
    devServerConfig,
  );
  const backPack = merge(
    nodeConfig,
    baseConfig,
  );

  return [frontPack, backPack];
};
