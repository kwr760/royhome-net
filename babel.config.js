/* eslint-disable no-template-curly-in-string */

function isWebTarget(caller) {
  return Boolean(caller && caller.target === 'web');
}
function isWebpack(caller) {
  return Boolean(caller && caller.name === 'babel-loader');
}

module.exports = (api) => {
  const web = api.caller(isWebTarget);
  const webpack = api.caller(isWebpack);

  return {
    presets: [
      '@babel/preset-react',
      '@babel/preset-flow',
      [
        '@babel/preset-env',
        {
          useBuiltIns: web ? 'entry' : undefined,
          corejs: web ? 'core-js@3' : false,
          targets: web ? { browsers: 'last 2 versions' } : { node: 'current' },
          modules: webpack ? false : 'commonjs',
        },
      ],
    ],
    retainLines: true,
    plugins: [
      [
        'transform-imports',
        {
          reactstrap: {
            transform: 'reactstrap/lib/${member}',
            preventFullImport: true,
          },
          lodash: {
            transform: 'lodash/${member}',
            preventFullImport: true,
          },
        },
      ],
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-transform-runtime',
      [
        '@babel/plugin-proposal-class-properties',
        {
          loose: true,
        },
      ],
      [
        'module-resolver',
        {
          alias: {
            '@src': './src',
            '@config': './src/config',
            '@common': './src/common',
            '@api': './src/api',
            '@web': './src/web',
          },
        },
      ],
      '@loadable/babel-plugin',
      'lodash',
    ],
    env: {
      'build:server': {
        ignore: [
          '**/*.spec.js',
        ],
      },
    },
  };
};
