module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    jquery: true,
  },
  extends: ['airbnb-base'],
  plugins: ['prettier', 'unicorn'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceTyp: 'module',
  },
  rules: {
    // Only allow debugger in development mode
    'no-debugger': process.argv.includes('--production') ? 'error' : 'off',

    // Only allow `console.log` in development mode
    'no-console': process.argv.includes('--production')
      ? ['error', { allow: ['warn', 'error'] }]
      : 'off',

    // https://eslint.org/docs/rules/multiline-comment-style
    'multiline-comment-style': 'off',

    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/no-null.md
    'unicorn/no-null': 'off',

    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/filename-case.md
    'unicorn/filename-case': [
      'error',
      {
        cases: {
          camelCase: true,
          pascalCase: true,
          kebabCase: true,
        },
      },
    ],
    /**
     * using only single quotes
     * @see https://eslint.org/docs/latest/rules/quotes
     */
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
      },
    ],
    'jsx-quotes': 'off',
    'no-restricted-syntax': 'off',
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    'no-use-before-define': 'off',
    'no-else-return': 'off',
    'no-lonely-if': 'off',
    'default-case': 'off',
    'no-unused-vars': 'warn',
    'comma-dangle': 'warn',
    'operator-linebreak': 'off',
    'no-multi-assign': 'off',
    'prefer-const': 'off',
    'implicit-arrow-linebreak': 'off',

    // https://eslint.org/docs/latest/rules/max-len
    'max-len': ['warn', 150],

    // Conflict with unicorn/prefer-spread
    'array-func/prefer-array-from': 'off',

    'import/order': 'off',
    'import/first': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/no-self-import': 'off',
    'import/no-extraneous-dependencies': 'off',
  },
};
