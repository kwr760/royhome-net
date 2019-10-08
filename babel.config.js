// babel.config.js
module.exports = {
  plugins: [
    'lodash',
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ],
  env: {
    production: {
      presets: [
        [
          '@babel/env',
          {
            modules: false,
            useBuiltIns: 'entry',
            corejs: { version: '3' },
            targets: { browsers: 'last 2 versions' },
          },
        ],
        '@babel/react',
      ],
      retainLines: true,
      plugins: [
        'lodash',
        '@babel/plugin-transform-runtime',
        '@loadable/babel-plugin',
        '@babel/plugin-syntax-dynamic-import',
      ],
    },
    development: {
      presets: [
        [
          '@babel/env',
          {
            modules: false,
            useBuiltIns: 'entry',
            corejs: { version: '3' },
            targets: { browsers: 'last 2 versions' },
          },
        ],
        '@babel/react',
      ],
      retainLines: true,
      plugins: [
        'lodash',
        '@babel/plugin-transform-runtime',
        '@loadable/babel-plugin',
        '@babel/plugin-syntax-dynamic-import',
      ],
    },
    test: {
      presets: ['@babel/env', '@babel/react'],
      retainLines: true,
      plugins: [
        'lodash',
        '@babel/plugin-transform-runtime',
        'dynamic-import-node-babel-7',
        '@loadable/babel-plugin',
        '@babel/plugin-syntax-dynamic-import',
      ],
    },
  },
};
