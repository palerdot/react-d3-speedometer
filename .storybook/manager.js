import { addons } from '@storybook/addons'
import { themes, create } from '@storybook/theming'

import speedoTheme from '../src/core/theme'

const theme = create(speedoTheme)

addons.setConfig({
  showPanel: true,
  // theme: themes.dark,
  theme,
})
