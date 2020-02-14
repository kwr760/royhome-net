import path from 'path';
import nodeExternals from 'webpack-node-externals';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const LoadablePlugin = require('@loadable/webpack-plugin');

const DIST_PATH = path.resolve(__dirname, 'dist');
const dev = !process.env.RELEASE_ENV || process.env.RELEASE_ENV === 'dev';

const getConfig = (target) => ({
  name: target,
  mode: dev ? 'development' : 'production',
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
          {
            loader: MiniCssExtractPlugin.loader,
          },
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
    target === 'node' ? [
      '@loadable/component',
      nodeExternals({
        whitelist: [/\.(?!(?:jsx?|json)$).{1,5}$/i],
      }),
    ] : undefined,
  output: {
    path: path.join(DIST_PATH, target),
    filename: dev ? '[name].js' : '[name]-bundle-[chunkhash:8].js',
    publicPath: `/dist/${target}/`,
    libraryTarget: target === 'node' ? 'commonjs2' : undefined,
  },
  plugins: [
    new LoadablePlugin(),
    new MiniCssExtractPlugin(),
    new CopyWebpackPlugin([
      { from: './images/favicon.ico' },
    ]),
  ],
});

export default [getConfig('web'), getConfig('node')];
