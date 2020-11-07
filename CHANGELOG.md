# Change Log

## 1.0.1
- `PropTypes` moved to `dependencies` from `peerDependencies`. ref - https://github.com/facebook/prop-types#how-to-depend-on-this-package

## 1.0.0 (v17 React support)
- `React v17` and `v6 d3` support. **No Breaking Changes.**

## 0.14.1
- `Typescript` types for `valueTextFontWeight` config/prop

## 0.14.0
- `valueTextFontWeight` config/prop to control font weight of current value. ref: https://codesandbox.io/s/eloquent-morning-mnysk?file=/src/App.js
- *dev changes*: prettier changes: `singleQuote: true`, `arrowParens: avoid`. `prettier` upgraded to `v2`
- *dev changes*: `jest v26`

## 1.0.0-rc.0
- First `1.0` Release candidate with `React 17` support

## 0.13.1
- ignore `coverage` folder from npm bundle

## 0.13.0
- `CustomSegmentLabelPosition`, `Transition` types for both Typescript and JS. Resolves https://github.com/palerdot/react-d3-speedometer/issues/81
- `100%` Test coverage
- `codecov`, `github actions` integration

## 0.12.0
- removed `@babel/runtime-corejs2` as dependency. ref: https://github.com/palerdot/react-d3-speedometer/issues/76

## 0.11.0
- migrated to `lodash-es` from `lodash` for better tree shaking. Exporting `types` and `themes` from core for better reusablility.
- removed `lodash` dependency. ref: https://codesandbox.io/s/zen-darkness-c3ev3, https://codesandbox.io/s/gracious-swanson-1rts8

## 0.10.1
- `npmignore` to reduce npm tarball/package size. Linking to github image asset for README

## 0.10.0
- `customSegmentLabels` prop to display custom labels. [Live Example](https://palerdot.in/react-d3-speedometer/?path=/story/reactspeedometer--custom-segment-labels)
- *bugfix*. Fixed https://github.com/palerdot/react-d3-speedometer/issues/68

## 0.9.0
- `Typescript` support with typescript definition file

## 0.8.0
- `paddingHorizontal`, `paddingVertical` props to configure space for label texts of bigger font sizes.

## 0.7.3
- `dimensionUnit` prop to configure `width/height` ... Defaults to `px`. More context - https://developer.mozilla.org/en-US/docs/Web/SVG/Content_type#Length

## 0.7.2
- `labelFontSize` and `valueTextFontSize` configurable props.
 
## 0.7.1
- `bugfix`. Handle negative values and custom min/max values for `customSegmentStops`. Fixes - https://github.com/palerdot/react-d3-speedometer/issues/51 and https://github.com/palerdot/react-d3-speedometer/issues/52. ref - https://codesandbox.io/s/jolly-thompson-2k3d7

## 0.7.0
- new `customSegmentStops` configuration to customize segments, ref: https://codesandbox.io/s/purple-cdn-eu9xf. **Complete rewrite** of core, where core is modularized and separated from lifecycle methods

## 0.6.1
- removed unwanted `global` package from dependency. ref: - https://codesandbox.io/s/billowing-lake-9somf

## 0.6.0
- new option/prop `segmentColors` for giving custom segment colors. Reference - https://palerdot.in/react-d3-speedometer/?path=/story/react-d3-speedometer--custom-segment-colors. ref: - https://codesandbox.io/s/relaxed-silence-c3qkb 

## 0.5.6
- `maxSegmentLabels` now takes `0` as valid value. Addresses - https://github.com/palerdot/react-d3-speedometer/issues/43

## 0.5.5 
- `babel 7` runtime issue fixed. Affected versions - `0.5.0` to `0.5.4`

## 0.5.0
- `maxSegmentLabels` prop to limit labels for segment. Useful for displaying gradient like effect. Example - https://palerdot.in/react-d3-speedometer/?path=/story/react-d3-speedometer--gradient-effect-with-large-number-of-segments-and-maxsegmentlabels-config
- `currentValuePlaceholderStyle` to configure custom placeholder for current value. Example - https://palerdot.in/react-d3-speedometer/?path=/story/react-d3-speedometer--custom-current-value-placeholder-style-for-eg-value

## 0.4.2
- `needleHeightRatio` for controlling the height of the needle. Takes a float between 0 and 1 and controls the height.

## 0.4.1
- Handle `d3` ticks behaviour when we get a single tick. Refer https://github.com/d3/d3-scale/issues/149 for more info

## 0.4.0
- Bumped d3 version to 5.x
- Handled specific `d3-scale` behaviour (https://github.com/d3/d3-scale/issues/149). Fixes https://github.com/palerdot/react-d3-speedometer/issues/27

## 0.3.3
- Handling invalid `needleTransition` prop. Switching to default `easeQuadInOut` by throwing a warning.

## 0.3.2
- Using simple string replace for `currentValueText` instead of template literal for better support for IE - https://caniuse.com/#feat=template-literals

## 0.3.1
- updating `peerDependencies` with `React 16` 

## 0.3.0
- `REACT 16` updating react version to 16, along with enzyme to version 3.

## 0.2.3
- `currentValueText` configuration to display custom current value text.

## 0.2.2
- `valueFormat` option for formatting the values. Should be a valid input for - https://github.com/d3/d3-format#locale_format

## 0.2.1
- Tweaked the positioning of current value element to be 23 points below so that it is legible in smaller speedometers.

## 0.2.0
- `forceRender` config option, to rerender the whole component on props change. Previously, only the values are updated and animated.

## 0.1.11
- new test case for custom `textColor` prop

## 0.1.10
- new test case for validating default color

## 0.1.9
- new test case for checking number of segments

## 0.1.8
- configuring `textColor`

## 0.1.7
- Basic test coverage using enzyme

## 0.1.5, 0.1.6

- Moving to `MIT` license

## 0.1.4

- Make `needleTransitionDuration` configurable
- Make `needleTransition` configurable
- make `ringWidth` configurable
