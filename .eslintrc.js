module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'object-curly-newline': 'off',
    'no-param-reassign': 'off',
    'max-len': 0,
    'import/prefer-default-export': 0
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
