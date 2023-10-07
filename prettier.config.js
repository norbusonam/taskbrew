module.exports = {
  // prettier-plugin-tailwindcss must be loaded last to prevent conflicts with other plugins:
  // https://github.com/tailwindlabs/prettier-plugin-tailwindcss#compatibility-with-other-prettier-plugins
  plugins: ["prettier-plugin-organize-imports", "prettier-plugin-tailwindcss"],
};
