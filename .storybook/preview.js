import { addParameters } from "@storybook/react"
import { create } from "@storybook/theming/create"
import theme from "../src/core/theme/"

const speedoTheme = create({
  ...theme,
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
