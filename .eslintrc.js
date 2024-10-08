module.exports = {
  parser: "@babel/eslint-parser",
  parserOptions: {
    babelOptions: {
      configFile: "./babel.config.json",
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ["eslint:recommended", "google"],
  rules: {
    "quote-props": ["error", "as-needed"],
    quotes: ["error", "double"],
    "linebreak-style": ["error", "windows"],
    "require-jsdoc": "off",
    "operator-linebreak": ["error", "before"],
  },
};
