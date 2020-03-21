// NOTE: Babel config just for storybook
// ref: https://github.com/storybookjs/storybook/issues/7058
module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react"],
  plugins: ["@babel/plugin-proposal-class-properties"],
}
