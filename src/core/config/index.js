import {
  scaleQuantize as d3ScaleQuantize,
  interpolateHsl as d3InterpolateHsl,
  rgb as d3Rgb,
  format as d3Format,
} from "d3"
import { calculateSegmentLabelCount } from "../util/"

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
  }

  return Object.assign({}, DEFAULT_CONFIG, config)
}
