// eslint-disable-next-line import/no-extraneous-dependencies
import webpack from 'webpack';
// eslint-disable-next-line import/no-extraneous-dependencies
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../../../webpack.config.babel';

const startDevServer = () => {
  const compiler = webpack(webpackConfig);

  return webpackDevMiddleware(compiler, {
    logLevel: 'silent',
    publicPath: '/dist/web',
    writeToDisk(filePath) {
      return /dist\/node\//.test(filePath) || /loadable-stats/.test(filePath);
    },
  });
};

export default startDevServer;
