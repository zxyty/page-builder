module.exports = {
  root: true,
  extends: [
    "airbnb",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:react/recommended",
    "plugin:import/typescript",
    "prettier/@typescript-eslint",
    "prettier"
  ],
  parser: "@typescript-eslint/parser",
  env: {
    browser: true,
    node: true
  },
  globals: {
    document: true,
    window: true
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "prettier/prettier": ["error", { printWidth: 80 }],
    "linebreak-style": 0,
    "no-bitwise": 0,
    "no-alert": 0,
    "no-param-reassign": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "jsx-a11y/anchor-has-content": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-noninteractive-element-interactions": 0,
    "jsx-a11y/anchor-is-valid": 0,
    "class-methods-use-this": 0,
    "no-underscore-dangle": 0,
    "no-await-in-loop": 0,
    "react/jsx-one-expression-per-line": 0,
    "react/jsx-filename-extension": 0,
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/consistent-type-assertions": 0,
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/no-empty-interface": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-non-null-assertion": 0,
    "@typescript-eslint/no-empty-function": 0,
    "@typescript-eslint/no-use-before-define": 0,
    "import/prefer-default-export": 0,
    "import/no-extraneous-dependencies": 0,
    "@typescript-eslint/no-unused-vars": 0,
    "import/no-unresolved": 0,
    "import/extensions": 0,
    "import/no-self-import" : 0,
    "global-require": 0,
    "no-unused-expressions": 0
  }
};
