/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/06/11 09:54:35 (GMT+0900)
 */
module.exports = {
  root: true,
  env: { browser: true, node: true },
  // parser: '@typescript-eslint/parser',
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    // 'eslint:recommended',
    // 'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    'prettier',
  ],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
      },
    ],
    '@typescript-eslint/no-non-null-assertion': 'off',
    // node.js require('some-lib')
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
  },
}
