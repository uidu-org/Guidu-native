module.exports = {
  extends: [
  "next",
  "prettier",
  "plugin:@typescript-eslint/recommended",
  "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ],
  root: true,
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "@typescript-eslint/unbound-method": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "caughtErrorsIgnorePattern": "^_"
      }
    ],
    "@typescript-eslint/consistent-type-imports": [
      "error",
      { "prefer": "type-imports", "fixStyle": "inline-type-imports" }
    ],
    "@typescript-eslint/no-unsafe-assignment": "off"
  },
  // parserOptions: {
  //   parser: '@typescript-eslint/parser',
  //   project: './tsconfig.json',
  //   tsconfigRootDir: __dirname,
  // },
}
