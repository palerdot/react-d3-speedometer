declare module "react-d3-speedometer" {
  enum CustomSegmentLabelPosition {
    Outside = "OUTSIDE",
    Inside = "INSIDE",
  }

  type CustomSegmentLabel = {
    text?: string
    position?: CustomSegmentLabelPosition
    fontSize?: string
    color?: string
  }

  type Props = {
    value?: number

    minValue?: number
    maxValue?: number

    segments?: number
    maxSegmentLabels?: number

    forceRender?: boolean

    width?: number
    height?: number

    dimensionUnit?: string
    fluidWidth?: boolean

    needleColor?: string
    startColor?: string
    endColor?: string
    segmentColors?: string[]

    needleTransition?: string
    needleTransitionDuration?: number
    needleHeightRatio?: number

    ringWidth?: number
    textColor?: string

    valueFormat?: string
    currentValueText?: string
    currentValuePlaceholderStyle?: string

    customSegmentStops?: number[]

    customSegmentLabels?: CustomSegmentLabel[]

    labelFontSize?: string
    valueTextFontSize?: string

    paddingHorizontal?: number
    paddingVertical?: number
  }

  const ReactSpeedometer: React.FunctionComponent<Props>

  // named exports of all the types
  export { Props, CustomSegmentLabel, CustomSegmentLabelPosition }

  export default ReactSpeedometer
}
