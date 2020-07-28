import path from 'path';
import nodeExternals from 'webpack-node-externals';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import LoadablePlugin from '@loadable/webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import StylelintPlugin from 'stylelint-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';

const dev = !process.env.RELEASE_ENV || process.env.RELEASE_ENV === 'dev';

const getConfig = (target) => {
  let additionalPlugins = [];
  if (dev) {
    if (target === 'web') {
      additionalPlugins = [
        new BundleAnalyzerPlugin({
          defaultSizes: 'gzip',
          openAnalyzer: false,
        }),
      ];
    }
  } else {
    additionalPlugins = [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          ecma: 6,
        },
      }),
    ];
  }

  return {
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
          test: /\.scss$/,
          use: [
            'isomorphic-style-loader',
            {
              loader: MiniCssExtractPlugin.loader,
            },
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: dev,
              },
            },
          ],
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
        {
          test: /\.(md)$/i,
          use: [
            {
              loader: 'raw-loader',
            },
          ],
        },
      ],
    },
    externals:
      target === 'node' ? [
        '@loadable/component',
        nodeExternals({
          allowlist: [/\.(?!(?:jsx?|json)$).{1,5}$/i],
        }),
      ] : undefined,
    output: {
      path: path.resolve(__dirname, 'dist', target),
      filename: dev ? '[name].js' : '[name].[chunkhash:8].js',
      publicPath: `/dist/${target}/`,
      libraryTarget: target === 'node' ? 'commonjs2' : undefined,
    },
    plugins: [
      new CleanWebpackPlugin(),
      new LoadablePlugin(),
      new MiniCssExtractPlugin({
        filename: dev ? '[name].css' : '[name].[chunkhash:8].css',
        chunkFilename: dev ? '[id].css' : '[id].[chunkhash:8].css',
      }),
      new WebpackMd5Hash(),
      new StylelintPlugin({
        configFile: './stylelint.config.js',
        files: './src/**/*.scss',
        syntax: 'scss',
      }),
      new CopyPlugin({
        patterns: [
          { from: 'src/client/assets/favicon.ico', to: './favicon.ico' },
          { from: 'src/client/assets/images/gold-on-blue.png', to: './favicon.png' },
        ],
      }),
      new LodashModuleReplacementPlugin(),
      ...additionalPlugins,
    ],
    resolve: {
      extensions: ['.js', '.scss'],
      alias: {
        '@src': path.resolve(__dirname, 'src/'),
      },
    },
    // optimization: {
    //   splitChunks: {
    // include all types of chunks
    // chunks: 'all',
    // },
    // },
    // optimization: {
    //   splitChunks: {
    // chunks: 'all',
    // maxInitialRequests: Infinity,
    // minSize: 0,
    // cacheGroups: {
    //   commons: {
    //     test: /[\\/]node_modules[\\/]/,
    //     name(module) {
    //       const splitMap = [
    //         { name: 'core-js', packages: ['core-js'] },
    //         { name: 'react', packages: ['react', 'react-router', 'react-redux', 'redux'] },
    //         { name: 'reactstrap', packages: ['reactstrap'] },
    //         { name: 'react-dom', packages: ['react-dom'] },
    //         { name: 'auth0-spa', packages: ['auth0'] },
    //       ];
    //       const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1].replace('@', '');
    //       const splitPackage = splitMap.filter((e) => e.packages.includes(packageName));
    //       const splitName = (splitPackage.length) ? splitPackage[0].name : 'packages';
    //
    //       return `vendor-${splitName}`;
    //     },
    //     chunks: 'all',
    //   },
    // },
    // },
    // },
  };
};

export default [getConfig('web'), getConfig('node')];
