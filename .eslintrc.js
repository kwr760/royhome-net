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
    'plugin:import/errors',
    'plugin:import/warnings'
  ],
  plugins: [
    'react',
    'react-hooks',
    'jsx-a11y'
  ],
  rules: {
    'react/jsx-filename-extension': [ 1, { "extensions": [".js", ".jsx"] } ],
    'react/jsx-props-no-spreading': [ 0 ],
    semi: ['error', 'always'],
    'react-hooks/rules-of-hooks': "error",
    'react-hooks/exhaustive-deps': "warn",
    'no-console': 'off',
    'comma-dangle': ["error", "always-multiline"],
    'import/no-dynamic-require': 0
  },
};
