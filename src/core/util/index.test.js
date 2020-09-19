import * as d3 from "d3"

import { calculateSegmentStops } from "./index"
import { getNeedleTransition } from "./get-needle-transition"
import { getConfig, DEFAULT_PROPS } from "../config/"
import { _renderLabels } from "../render/"

describe("calculate segment data", () => {
  const tickData = [0.33, 0.33, 0.33]
  const min = 0
  const max = 1000

  test("for empty segment stops", () => {
    expect(
      calculateSegmentStops({
        tickData,
        customSegmentStops: [],
        min,
        max,
      })
    ).toEqual(tickData)
  })
  test("for invalid segment stops", () => {
    expect(
      calculateSegmentStops({
        tickData,
        customSegmentStops: {},
        min,
        max,
      })
    ).toEqual(tickData)
  })

  // test for error if min does not match
  test("throw error for invalid min value as first", () => {
    expect(() =>
      calculateSegmentStops({
        tickData,
        customSegmentStops: [0, 50, 1000],
        min: 10,
        max,
      })
    ).toThrowError(/min/)
  })

  // test for error if max does not match
  test("throw error for invalid max value as last", () => {
    expect(() =>
      calculateSegmentStops({
        tickData,
        customSegmentStops: [0, 50, 1000],
        min: 0,
        max: 100,
      })
    ).toThrowError(/max/)
  })

  // test correctly massaged data
  test("throw error for invalid max value as last", () => {
    expect(
      calculateSegmentStops({
        tickData,
        customSegmentStops: [0, 500, 750, 1000],
        min,
        max,
      })
    ).toEqual([0.5, 0.25, 0.25])
  })

  // test massaged data for custom min/max values
  test("confirm massaged data for custom min/max values", () => {
    expect(
      calculateSegmentStops({
        tickData,
        customSegmentStops: [500, 777, 1000],
        min: 500,
        max: 1000,
      })
    ).toEqual([0.554, 0.446])

    // test for negative values
    expect(
      calculateSegmentStops({
        tickData,
        customSegmentStops: [-120, -100, 0],
        min: -120,
        max: 0,
      })
    ).toEqual([0.16666666666666666, 0.8333333333333334])
  })
})

describe("verify needle transitions", () => {
  test("needle transitions", () => {
    expect(d3.easeLinear).toEqual(getNeedleTransition("easeLinear"))
    expect(d3.easeQuadIn).toEqual(getNeedleTransition("easeQuadIn"))
    expect(d3.easeQuadOut).toEqual(getNeedleTransition("easeQuadOut"))
    expect(d3.easeQuadInOut).toEqual(getNeedleTransition("easeQuadInOut"))
    expect(d3.easeCubicIn).toEqual(getNeedleTransition("easeCubicIn"))
    expect(d3.easeCubicOut).toEqual(getNeedleTransition("easeCubicOut"))
    expect(d3.easeCubicInOut).toEqual(getNeedleTransition("easeCubicInOut"))
    expect(d3.easePolyIn).toEqual(getNeedleTransition("easePolyIn"))
    expect(d3.easePolyOut).toEqual(getNeedleTransition("easePolyOut"))
    expect(d3.easePolyInOut).toEqual(getNeedleTransition("easePolyInOut"))
    expect(d3.easeSinIn).toEqual(getNeedleTransition("easeSinIn"))
    expect(d3.easeSinOut).toEqual(getNeedleTransition("easeSinOut"))
    expect(d3.easeSinInOut).toEqual(getNeedleTransition("easeSinInOut"))
    expect(d3.easeExpIn).toEqual(getNeedleTransition("easeExpIn"))
    expect(d3.easeExpOut).toEqual(getNeedleTransition("easeExpOut"))
    expect(d3.easeExpInOut).toEqual(getNeedleTransition("easeExpInOut"))
    expect(d3.easeCircleIn).toEqual(getNeedleTransition("easeCircleIn"))
    expect(d3.easeCircleOut).toEqual(getNeedleTransition("easeCircleOut"))
    expect(d3.easeCircleInOut).toEqual(getNeedleTransition("easeCircleInOut"))
    expect(d3.easeBounceIn).toEqual(getNeedleTransition("easeBounceIn"))
    expect(d3.easeBounceOut).toEqual(getNeedleTransition("easeBounceOut"))
    expect(d3.easeBounceInOut).toEqual(getNeedleTransition("easeBounceInOut"))
    expect(d3.easeBackIn).toEqual(getNeedleTransition("easeBackIn"))
    expect(d3.easeBackOut).toEqual(getNeedleTransition("easeBackOut"))
    expect(d3.easeBackInOut).toEqual(getNeedleTransition("easeBackInOut"))
    expect(d3.easeElasticIn).toEqual(getNeedleTransition("easeElasticIn"))
    expect(d3.easeElasticOut).toEqual(getNeedleTransition("easeElasticOut"))
    expect(d3.easeElasticInOut).toEqual(getNeedleTransition("easeElasticInOut"))
    expect(d3.easeElastic).toEqual(getNeedleTransition("easeElastic"))
  })
})

describe("verify configuration", () => {
  const expected_config = {
    ringInset: 20,
    pointerWidth: 10,
    pointerTailLength: 5,
    minAngle: -90,
    maxAngle: 90,
    labelInset: 10,
    width: 300,
    height: 300,
    paddingHorizontal: 0,
    paddingVertical: 0,
    dimensionUnit: "px",
    ringWidth: 60,
    minValue: 0,
    maxValue: 1000,
    needleColor: "steelblue",
    majorTicks: 5,
    customSegmentStops: [],
    customSegmentLabels: [],
    maxSegmentLabels: 5,
    segmentColors: [],
    needleTransition: "easeQuadInOut",
    needleTransitionDuration: 500,
    needleHeightRatio: 0.9,
    textColor: "#666",
    currentValueText: "${value}",
    currentValuePlaceholderStyle: "${value}",
    labelFontSize: "14px",
    valueTextFontSize: "16px",
  }

  test("check default config", () => {
    const generated_config = getConfig({
      PROPS: DEFAULT_PROPS,
      parentWidth: 500,
      parentHeight: 500,
    })

    expect(generated_config).toMatchObject(expected_config)
  })

  test("check config for fluidWidth: true", () => {
    const PROPS = {
      ...DEFAULT_PROPS,
      fluidWidth: true,
    }

    const expected_fluid_width_config = {
      ...expected_config,
      width: 500,
      height: 500,
    }

    const generated_config = getConfig({
      PROPS,
      parentWidth: 500,
      parentHeight: 500,
    })

    expect(generated_config).toMatchObject(expected_fluid_width_config)
  })

  test("to throw error if invalid 'customSegmentLabels' config", () => {
    const PROPS = {
      ...DEFAULT_PROPS,
      // invalid segment label config to simulate error
      customSegmentLabels: ["porumai"],
    }

    const config = getConfig({
      PROPS,
      parentWidth: 500,
      parentHeight: 500,
    })

    expect(() => {
      _renderLabels({ config })
    }).toThrow()
  })
})
