module.exports = {
    extends: [
      "airbnb-typescript",
      "plugin:prettier/recommended"
    ],
    parserOptions: {
      project: "./tsconfig.json"
    },
    // We need this plugin to import types.d.ts files
    plugins: ["import", "cypress", "react-hooks"],
    rules: {
      // Dont worry about prop type validation because were using typescript
      "react/prop-types": 0,
      // Make everything double quotes, just used to it
      "@typescript-eslint/quotes": [
        "error",
        "double",
        {
          avoidEscape: true
        }
      ],
      // This comes with airbnb but is contested in the community
      // Most are fine with nested ternary oeprators, as its better than a bunch of if/switch statements
      "no-nested-ternary": 0,
      // Disable airbnb indent rule and prefer prettier
      "@typescript-eslint/indent": 0,
      // There was vague reasoning for not allowing newlines in JSX in the react plugin description
      // Removing it because I couldnt find anything about it elsewhere and prettier doesnt like it
      "react/jsx-indent": 0,
      // Prettier handles this
      "react/jsx-indent-props": 0,
      // Prettier handles this
      "react/jsx-wrap-multilines": 0,
      // Prettier handles this,
      "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
      "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
      "react/jsx-curly-newline": 0,
      "react/jsx-one-expression-per-line": 0,
      "cypress/no-assigning-return-values": "error",
      "cypress/no-unnecessary-waiting": "error",
      "cypress/assertion-before-screenshot": "warn",
      "cypress/no-force": "warn",
      "cypress/no-async-tests": "error"
    },
    settings: {
      // Config for the react plugin
      react: {
        version: "detect"
      },
      // This is here so we can resolve types.d.ts files when doing import * as whatever
      // Specifically for api-spec imports
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          directory: "./tsconfig.json"
        }
      }
    },
    env: {
      "cypress/globals": true
    }
  };
  