// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential', 
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // iView 将标签渲染为原生 html 标签时，由于这些标签是自闭合的，所以有 end 标签会报错
    'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
    // // 必须要分号结尾
    // 'semi': ['error', 'always'],
    // // 多行的对象字面量项尾必须有逗号
    // 'comma-dangle': ['error', 'always-multiline'],
    // 方法定义前面不需要空格
    'space-before-function-paren': 0,
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
