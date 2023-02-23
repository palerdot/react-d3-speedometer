// ref: https://github.com/storybookjs/builder-vite/blob/main/examples/react-18/.storybook/main.js
const { mergeConfig } = require('vite')

module.exports = {
  features: {
    storyStoreV7: true,
  },
  async viteFinal(config, { configType }) {
    // customize the Vite config here
    // https://github.com/storybookjs/builder-vite/issues/237#issuecomment-1047819614
    const { dirname } = require('path')
    // https://github.com/eirslett/storybook-builder-vite/issues/55
    config.root = dirname(require.resolve('@storybook/builder-vite'))

    return mergeConfig(config, {
      define: {
        ...config.define,
        global: 'window',
      },
    })
  },
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    // '@storybook/addon-links',
    '@storybook/addon-essentials',
    // '@storybook/addon-interactions',
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-vite',
    // ref: https://storybook.js.org/docs/react/configure/telemetry
    disableTelemetry: true, // 👈 Disables telemetry
  },
}
