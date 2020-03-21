import { addParameters } from "@storybook/react"
import { themes } from "@storybook/theming"
import { create } from "@storybook/theming/create"

const speedoTheme = create({
  base: "dark",

  appBg: "#413c69",
  appContentBg: "#2a2744",
  barBg: "#373359",
  // appContentBg: "#413c69",

  brandTitle: "react-d3-speedometer",
  brandUrl: "https://github.com/palerdot/react-d3-speedometer",
})

addParameters({
  options: {
    /**
     * display the top-level grouping as a "root" in the sidebar
     * @type {Boolean}
     */
    showPanel: true,
    showRoots: true,
    theme: speedoTheme,
  },
  docs: {
    previewSource: "open",
  },
})
