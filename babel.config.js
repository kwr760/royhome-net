// babel.config.js
module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    '@babel/plugin-proposal-class-properties',
  ],
  env: {
    test: {
      plugins: [
        'transform-es2015-modules-commonjs',
      ],
    },
  },
};
