module.exports = {
  root: true,
  extends: [
    "plugin:storybook/recommended",
    "@byloth/eslint-config",
    "@byloth/eslint-config-typescript",
    "@byloth/eslint-config-vue"
  ],
  ignorePatterns: ["!/.storybook/"]
};
