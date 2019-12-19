import path from 'path';
import nodeExternals from 'webpack-node-externals';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const LoadablePlugin = require('@loadable/webpack-plugin');

const DIST_PATH = path.resolve(__dirname, 'dist');
const production = process.env.NODE_ENV === 'production';
const development = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

const getConfig = (target) => ({
  name: target,
  mode: development ? 'development' : 'production',
  target,
  devtool: 'source-map',
  entry: `./src/client/index-${target}.js`,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              caller: { target },
            },
          },
          'eslint-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          // {
          //   loader: MiniCssExtractPlugin.loader,
          // },
          'css-loader',
        ],
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
    ],
  },
  externals:
    target === 'node' ? ['@loadable/component', nodeExternals()] : undefined,
  output: {
    path: path.join(DIST_PATH, target),
    filename: production ? '[name]-bundle-[chunkhash:8].js' : '[name].js',
    publicPath: `/dist/${target}/`,
    libraryTarget: target === 'node' ? 'commonjs2' : undefined,
  },
  plugins: [
    new LoadablePlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/client', 'index.html'),
      favicon: path.resolve(__dirname, 'src/client', 'favicon.ico'),
      filename: 'index.html',
    }),
  ],
});

export default [getConfig('web'), getConfig('node')];
