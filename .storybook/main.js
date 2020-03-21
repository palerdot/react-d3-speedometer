module.exports = {
  stories: [
    "../**/*.stories.js",
    // "../src/stories/index.js"
  ],
  addons: [
    // "@storybook/addon-knobs/register",
    "@storybook/addon-storysource",
    {
      name: "@storybook/addon-docs",
      options: {
        configureJSX: true,
        babelOptions: {},
        sourceLoaderOptions: null,
      },
    },
  ],
}
