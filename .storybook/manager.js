import { addons } from '@storybook/addons'
import { themes, create } from '@storybook/theming'

import speedoTheme from '../src/core/theme'

const theme = create(speedoTheme)
const finalTheme = {
  ...themes.dark,
  ...theme,
}

addons.setConfig({
  showPanel: true,
  // theme: themes.dark,
  theme: finalTheme,
})
