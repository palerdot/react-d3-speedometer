// ref: https://github.com/storybookjs/builder-vite/blob/main/examples/react-18/.storybook/main.js
const { mergeConfig } = require('vite')

module.exports = {
  features: {},

  // async viteFinal(config, { configType }) {
  //   // customize the Vite config here
  //   // https://github.com/storybookjs/builder-vite/issues/237#issuecomment-1047819614
  //   const { dirname } = require('path')
  //   // https://github.com/eirslett/storybook-builder-vite/issues/55
  //   config.root = dirname(require.resolve('@storybook/builder-vite'))

  //   return mergeConfig(config, {
  //     define: {
  //       ...config.define,
  //       global: 'window',
  //     },
  //   })
  // },

  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: [
    // '@storybook/addon-links',
    '@storybook/addon-essentials',
    // '@storybook/addon-interactions',
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  core: {
    // ref: https://storybook.js.org/docs/react/configure/telemetry
    // 👈 Disables telemetry
    disableTelemetry: true,
  },

  docs: {},

  // typescript: {
  //   reactDocgen: 'react-docgen-typescript',
  // },
}
