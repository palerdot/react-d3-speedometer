import {
  scaleQuantize as d3ScaleQuantize,
  interpolateHsl as d3InterpolateHsl,
  rgb as d3Rgb,
  format as d3Format,
} from "d3"
import { calculateSegmentLabelCount } from "../util/"

// default props
export const DEFAULT_PROPS = {
  value: 0,
  minValue: 0,
  maxValue: 1000,

  forceRender: false,

  width: 300,
  height: 300,
  paddingHorizontal: 0,
  paddingVertical: 0,

  fluidWidth: false,
  dimensionUnit: "px",

  // segments to show in the speedometer
  segments: 5,
  // maximum segment label to be shown
  maxSegmentLabels: -1,
  customSegmentStops: [],

  // color strings
  needleColor: "steelblue",
  startColor: "#FF471A",
  endColor: "#33CC33",
  // custom segment colors; by default off
  segmentColors: [],

  // needle transition type and duration
  needleTransition: "easeQuadInOut",
  needleTransitionDuration: 500,
  needleHeightRatio: 0.9,

  ringWidth: 60,

  // text color (for both showing current value and segment values)
  textColor: "#666",

  // label format => https://github.com/d3/d3-format
  // by default ""; takes valid input for d3 format
  valueFormat: "",

  // value text string format; by default it just shows the value
  // takes es6 template string as input with a default ${value}
  currentValueText: "${value}",
  // specifies the style of the placeholder for current value
  // change it some other format like "#{value}" and use it in current value text as => "Current Value: #{value}"
  currentValuePlaceholderStyle: "${value}",

  // font sizes
  labelFontSize: "14px",
  valueTextFontSize: "16px",
}

// default config
const DEFAULT_CONFIG = {
  ringInset: 20,

  pointerWidth: 10,
  pointerTailLength: 5,

  minAngle: -90,
  maxAngle: 90,

  labelInset: 10,
}

export const getConfig = ({ PROPS, parentWidth, parentHeight }) => {
  const config = {
    // width/height config
    // if fluidWidth; width/height taken from the parent of the ReactSpeedometer
    // else if width/height given it is used; else our default
    width: PROPS.fluidWidth ? parentWidth : PROPS.width,
    height: PROPS.fluidWidth ? parentHeight : PROPS.height,

    // text padding horizontal/vertical
    paddingHorizontal: PROPS.paddingHorizontal,
    paddingVertical: PROPS.paddingVertical,

    // width/height dimension unit ... default "px"
    dimensionUnit: PROPS.dimensionUnit,

    // ring width should be 1/4 th of width
    ringWidth: PROPS.ringWidth,
    // min/max values
    minValue: PROPS.minValue,
    maxValue: PROPS.maxValue,
    // color of the speedometer needle
    needleColor: PROPS.needleColor,
    // segments in the speedometer
    majorTicks: PROPS.segments,
    // custom segment points
    customSegmentStops: PROPS.customSegmentStops,
    // max segment labels
    maxSegmentLabels: calculateSegmentLabelCount({
      maxSegmentLabelCount: PROPS.maxSegmentLabels,
      segmentCount: PROPS.segments,
    }),
    segmentColors: PROPS.segmentColors,
    // color range for the segments
    arcColorFn:
      PROPS.segmentColors.length > 0
        ? d3ScaleQuantize(PROPS.segmentColors)
        : d3InterpolateHsl(d3Rgb(PROPS.startColor), d3Rgb(PROPS.endColor)),
    // needle configuration
    needleTransition: PROPS.needleTransition,
    needleTransitionDuration: PROPS.needleTransitionDuration,
    needleHeightRatio: PROPS.needleHeightRatio,
    // text color
    textColor: PROPS.textColor,
    // label format
    labelFormat: d3Format(PROPS.valueFormat),
    // value text string (template string)
    currentValueText: PROPS.currentValueText,
    // placeholder style for 'currentValue'
    currentValuePlaceholderStyle: PROPS.currentValuePlaceholderStyle,

    // font sizes
    labelFontSize: PROPS.labelFontSize,
    valueTextFontSize: PROPS.valueTextFontSize,
  }

  return Object.assign({}, DEFAULT_CONFIG, config)
}

export const updateConfig = (config, params) => {
  return {
    ...config,
    ...params,
  }
}
