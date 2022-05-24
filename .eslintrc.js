// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: ['standard', 'standard-jsx'],
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // space-before-function-paren
    'space-before-function-paren': 0,
    // camelcase
    camelcase: 0,
    // comma-dangle
    'comma-dangle': 0,
    // no-callback-literal
    'no-callback-literal': 0,

    semi: [2, 'always'],

    'quotes': 'single',
  }
}
