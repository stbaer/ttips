module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: 'standard',
  globals: {
    'ttips': false,
    'PROD': false,
    'DEV': false,
    'TEST': false
  },
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
    'semi': 2,
    'no-alert': 2,
    'prefer-const': 2,
    'no-var': 2
  }
}
