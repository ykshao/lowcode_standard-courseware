/**
 * Created by yangxy on 2020/1/16.
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  globals: {
    '_': true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/no-use-v-if-with-v-for': 'off',
    'vue/valid-v-for': 'off',
    'standard/no-callback-literal': 'off',
    'no-return-await': 'off',
    'no-unused-vars': 0,
    'vue/no-unused-components': 'off',
    'vue/no-unused-vars': 'off',
    'space-before-function-paren': [2, 'never']
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
