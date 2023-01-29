module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "eslint-config-prettier",
  ],
  rules: {
    "no-console": "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "object-curly-newline": "off",
    "no-param-reassign": "off",
    "max-len": 0,
    "import/prefer-default-export": 0,
    "vue/multi-word-component-names": 0,
  },
};
