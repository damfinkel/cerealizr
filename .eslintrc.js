module.exports = {
  env: {
    es6: true,
    node: true,
    browser: true,
    jest: true
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    sourceType: 'module'
  },
  plugins: ['prettier'],
  extends: ['eslint:recommended'],
  globals: {
    __DEV__: true
  },
  rules: {
    'prettier/prettier': ['error', { printWidth: 110, singleQuote: true }],
    'no-invalid-this': 'off',
    'no-return-assign': 'error',
    'no-param-reassign': 'error',
    'no-nested-ternary': 'error'
  }
};
