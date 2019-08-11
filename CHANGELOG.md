# Change Log

## 0.7.0
- new `customSegmentStops` configuration to customize segments, ref: https://palerdot.in/react-d3-speedometer/?path=/story/react-d3-speedometer--custom-segment-stops. **Complete rewrite** of core, where core is modularized and separated from lifecycle methods

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
