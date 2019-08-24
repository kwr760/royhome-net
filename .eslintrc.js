module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  root: true,
  env: {
    browser: true,
    // commonjs: true,
    es6: true,
    node: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'prettier',
    'prettier/standard',
    'prettier/react'
  ],
  plugins: [
    'prettier',
    'react',
    'react-hooks',
    'jsx-a11y'
  ],
  rules: {
    'react/jsx-filename-extension': [ 1, { "extensions": [".js", ".jsx"] } ],
    semi: ['error', 'always'],
    'react-hooks/rules-of-hooks': "error",
    'react-hooks/exhaustive-deps': "warn",
  },
};
