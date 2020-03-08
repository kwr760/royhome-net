import path from 'path';
import nodeExternals from 'webpack-node-externals';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import LoadablePlugin from '@loadable/webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import StylelintPlugin from 'stylelint-webpack-plugin';

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
      {
        test: /\.(svg|png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images',
            },
          },
        ],
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
    new CleanWebpackPlugin(),
    new LoadablePlugin(),
    new MiniCssExtractPlugin({
      filename: dev ? '[name].css' : '[name].[chuckhash:8].css',
      chunkFilename: dev ? '[id].css' : '[id].[chunkhash:8].css',
    }),
    new CopyWebpackPlugin([
      { from: './src/client/assets/favicon.ico' },
    ]),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/client/assets/index.html',
      filename: 'index.html',
    }),
    new WebpackMd5Hash(),
    new StylelintPlugin({
      configFile: './stylelint.config.js',
      files: './src/**/*.scss',
      syntax: 'scss',
    }),
  ],
});

export default [getConfig('web'), getConfig('node')];
