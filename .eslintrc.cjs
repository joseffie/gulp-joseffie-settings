module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    jquery: true,
  },
  extends: ['airbnb-base'],
  plugins: ['prettier'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    resolve: {
      extensions: ['*', '.js', '.mjs', '.cjs'],
    },
  },
  rules: {
    'class-methods-use-this': 'off',
    'no-console': 'off',
    'no-continue': 'off',
    'no-bitwise': 'off',
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-param-reassign': 'off',
    'no-underscore-dangle': 'off',
    'no-return-assign': ['error', 'except-parens'],
    'import/first': 'off',
    'import/order': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
  },
  overrides: [{
    files: ['gulp/**/*.js', 'posthtml.config.js', 'postcss.config.cjs'],
    rules: {
      'import/no-extraneous-dependencies': 'off',
    },
  }],
  settings: {
    'import/resolver': {
      alias: {
        extensions: ['.js', '.mjs', '.cjs'],
        map: [
          ['@', './src'],
          ['@helpers', './src/base/scripts/helpers'],
          ['@core', './src/base/scripts/core'],
        ],
      },
    },
  },
};
