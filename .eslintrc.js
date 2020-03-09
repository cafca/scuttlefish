module.exports = {
  extends: [
    "standard-with-typescript",
    "prettier", // keep prettier* last
    "prettier/standard",
    "prettier/@typescript-eslint",
    "plugin:react/recommended"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    ecmaFeatures: {
      tsx: true
    }
  },
  plugins: ["@typescript-eslint", "prettier", "standard", "react"],
  root: true,
  rules: {
    "react/jsx-uses-vars": 1
  },
  settings: {
    react: {
      version: "detect"
    }
  }
};
