module.exports = {
    env: {
      es6: true,
      node: true
    },
    extends: ["airbnb-base", "prettier"],
    plugins: ["prettier", "react"],
    globals: {
      Atomics: "readonly",
      SharedArrayBuffer: "readonly"
    },
    parser: "babel-eslint",
    parserOptions: {
      ecmaVersion: 2018,
      sourceType: "module"
    },
    rules: {
      "prettier/prettier": "error",
      "class-methods-use-this": "off",
      "no-param-reassign": "off",
      "camelcase": "off",
      "no-unused-vars": ["error", { "argsIgnorePattern": "next" }],
      "no-undef": "off",
      "no-underscore-dangle": "off",
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
    }
  };
