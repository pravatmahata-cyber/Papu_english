const tsParser = require("@typescript-eslint/parser");
const globals = require("globals");

module.exports = [
  {
    files: ["**/*.{js,ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      globals: { ...globals.node, ...globals.es2021 },
    },
    rules: {},
  },
];
