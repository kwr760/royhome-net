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
    'plugin:import/warnings',
  ],
  plugins: [
    'react',
    'react-hooks',
    'jsx-a11y',
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/jsx-props-no-spreading': [0],
    semi: ['error', 'always'],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-console': 'off',
    'no-multi-str': 'off',
    'comma-dangle': ['error', 'always-multiline'],
    'import/no-dynamic-require': 0,
    'import/prefer-default-export': 'off',
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['warn', 'single'],
    'no-unused-vars': [
      'warn',
      { vars: 'all', args: 'none', ignoreRestSiblings: false },
    ],
    'max-len': ['warn', { code: 120, tabWidth: 2 }],
    'no-throw-literal': 0,
  },
  settings: {
    'import/resolver': {
      alias: [
        ['@src', './src'],
        ['@config', './src/config'],
        ['@common', './src/common'],
        ['@web', './src/web'],
        ['@api', './src/api'],
      ],
    },
  },
};
