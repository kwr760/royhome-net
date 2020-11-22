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

const isDevel = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

const getConfig = (target) => {
  let additionalPlugins = [];
  if (isDevel) {
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

  let devServer;
  if (isDevel) {
    devServer = {
      contentBase: path.join(__dirname, 'dist'),
      watchContentBase: true,
      compress: true,
      hot: true,
      port: 3000,
    };
  }

  return {
    name: target,
    mode: isDevel ? 'development' : 'production',
    target,
    devtool: 'source-map',
    entry: `./src/web/client/index-${target}.tsx`,
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript',
              ],
            },
          },
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
                sourceMap: isDevel,
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
    externals: target === 'node' ? [
      '@loadable/component',
      nodeExternals({
        allowlist: [/\.(?!(?:tsx?|json)$).{1,5}$/i],
      }),
    ] : undefined,
    output: {
      path: path.resolve(__dirname, 'dist', target),
      filename: isDevel ? '[name].js' : '[name].[chunkhash:8].js',
      publicPath: `/dist/web/`,
      libraryTarget: target === 'node' ? 'commonjs2' : undefined,
    },
    plugins: [
      new CleanWebpackPlugin(),
      new LoadablePlugin(),
      new MiniCssExtractPlugin({
        filename: isDevel ? '[name].css' : '[name].[chunkhash:8].css',
        chunkFilename: isDevel ? '[id].css' : '[id].[chunkhash:8].css',
      }),
      new WebpackMd5Hash(),
      new StylelintPlugin({
        configFile: './stylelint.config.js',
        files: './src/**/*.scss',
        syntax: 'scss',
      }),
      new CopyPlugin({
        patterns: [
          { from: 'src/web/client/assets/favicon.ico', to: './favicon.ico' },
          { from: 'src/web/client/assets/images/gold-on-blue.png', to: './favicon.png' },
        ],
      }),
      new LodashModuleReplacementPlugin(),
      ...additionalPlugins,
    ],
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss'],
      alias: {
        '@src': path.resolve(__dirname, 'src/'),
      },
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const splitMap = [
                { name: 'core-js', packages: ['core-js'] },
                { name: 'react', packages: ['react', 'react-router', 'react-router-dom', 'react-redux', 'redux', 'react-dom', 'react-transition-group'] },
                { name: 'axios', packages: ['axios'] },
                { name: 'lodash', packages: ['lodash'] },
                { name: 'auth0-spa', packages: ['auth0'] },
                { name: 'react-icons', packages: ['react-icons'] },
                { name: 'markdown', packages: ['react-markdown', 'remark-parse'] },
              ];
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1].replace('@', '');
              const splitPackage = splitMap.filter((e) => e.packages.includes(packageName));
              const splitName = (splitPackage.length) ? splitPackage[0].name : 'packages';

              return `vendor-${splitName}`;
            },
          },
        },
      },
    },
    devServer,
  };
};

export default [getConfig('web'), getConfig('node')];
