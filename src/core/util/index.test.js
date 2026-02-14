import {
  easeLinear as d3EaseLinear,
  easeQuadIn as d3EaseQuadIn,
  easeQuadOut as d3EaseQuadOut,
  easeQuadInOut as d3EaseQuadInOut,
  easeCubicIn as d3EaseCubicIn,
  easeCubicOut as d3EaseCubicOut,
  easeCubicInOut as d3EaseCubicInOut,
  easePolyIn as d3EasePolyIn,
  easePolyOut as d3EasePolyOut,
  easePolyInOut as d3EasePolyInOut,
  easeSinIn as d3EaseSinIn,
  easeSinOut as d3EaseSinOut,
  easeSinInOut as d3EaseSinInOut,
  easeExpIn as d3EaseExpIn,
  easeExpOut as d3EaseExpOut,
  easeExpInOut as d3EaseExpInOut,
  easeCircleIn as d3EaseCircleIn,
  easeCircleOut as d3EaseCircleOut,
  easeCircleInOut as d3EaseCircleInOut,
  easeBounceIn as d3EaseBounceIn,
  easeBounceOut as d3EaseBounceOut,
  easeBounceInOut as d3EaseBounceInOut,
  easeBackIn as d3EaseBackIn,
  easeBackOut as d3EaseBackOut,
  easeBackInOut as d3EaseBackInOut,
  easeElasticIn as d3EaseElasticIn,
  easeElasticOut as d3EaseElasticOut,
  easeElasticInOut as d3EaseElasticInOut,
  easeElastic as d3EaseElastic,
} from 'd3-ease'

import { calculateSegmentStops } from './index'
import { getNeedleTransition } from './get-needle-transition'
import { getConfig, DEFAULT_PROPS } from '../config/'
import { _renderLabels } from '../render/'

describe('calculate segment data', () => {
  const tickData = [0.33, 0.33, 0.33]
  const min = 0
  const max = 1000

  test('for empty segment stops', () => {
    expect(
      calculateSegmentStops({
        tickData,
        customSegmentStops: [],
        min,
        max,
      })
    ).toEqual(tickData)
  })
  test('for invalid segment stops', () => {
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
  test('throw error for invalid min value as first', () => {
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
  test('throw error for invalid max value as last', () => {
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
  test('throw error for invalid max value as last', () => {
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
  test('confirm massaged data for custom min/max values', () => {
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

describe('verify needle transitions', () => {
  test('needle transitions', () => {
    expect(d3EaseLinear).toEqual(getNeedleTransition('easeLinear'))
    expect(d3EaseQuadIn).toEqual(getNeedleTransition('easeQuadIn'))
    expect(d3EaseQuadOut).toEqual(getNeedleTransition('easeQuadOut'))
    expect(d3EaseQuadInOut).toEqual(getNeedleTransition('easeQuadInOut'))
    expect(d3EaseCubicIn).toEqual(getNeedleTransition('easeCubicIn'))
    expect(d3EaseCubicOut).toEqual(getNeedleTransition('easeCubicOut'))
    expect(d3EaseCubicInOut).toEqual(getNeedleTransition('easeCubicInOut'))
    expect(d3EasePolyIn).toEqual(getNeedleTransition('easePolyIn'))
    expect(d3EasePolyOut).toEqual(getNeedleTransition('easePolyOut'))
    expect(d3EasePolyInOut).toEqual(getNeedleTransition('easePolyInOut'))
    expect(d3EaseSinIn).toEqual(getNeedleTransition('easeSinIn'))
    expect(d3EaseSinOut).toEqual(getNeedleTransition('easeSinOut'))
    expect(d3EaseSinInOut).toEqual(getNeedleTransition('easeSinInOut'))
    expect(d3EaseExpIn).toEqual(getNeedleTransition('easeExpIn'))
    expect(d3EaseExpOut).toEqual(getNeedleTransition('easeExpOut'))
    expect(d3EaseExpInOut).toEqual(getNeedleTransition('easeExpInOut'))
    expect(d3EaseCircleIn).toEqual(getNeedleTransition('easeCircleIn'))
    expect(d3EaseCircleOut).toEqual(getNeedleTransition('easeCircleOut'))
    expect(d3EaseCircleInOut).toEqual(getNeedleTransition('easeCircleInOut'))
    expect(d3EaseBounceIn).toEqual(getNeedleTransition('easeBounceIn'))
    expect(d3EaseBounceOut).toEqual(getNeedleTransition('easeBounceOut'))
    expect(d3EaseBounceInOut).toEqual(getNeedleTransition('easeBounceInOut'))
    expect(d3EaseBackIn).toEqual(getNeedleTransition('easeBackIn'))
    expect(d3EaseBackOut).toEqual(getNeedleTransition('easeBackOut'))
    expect(d3EaseBackInOut).toEqual(getNeedleTransition('easeBackInOut'))
    expect(d3EaseElasticIn).toEqual(getNeedleTransition('easeElasticIn'))
    expect(d3EaseElasticOut).toEqual(getNeedleTransition('easeElasticOut'))
    expect(d3EaseElasticInOut).toEqual(getNeedleTransition('easeElasticInOut'))
    expect(d3EaseElastic).toEqual(getNeedleTransition('easeElastic'))
  })
})

describe('verify configuration', () => {
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
    dimensionUnit: 'px',
    ringWidth: 60,
    minValue: 0,
    maxValue: 1000,
    needleColor: 'steelblue',
    majorTicks: 5,
    customSegmentStops: [],
    customSegmentLabels: [],
    maxSegmentLabels: 5,
    segmentColors: [],
    needleTransition: 'easeQuadInOut',
    needleTransitionDuration: 500,
    needleHeightRatio: 0.9,
    textColor: '#666',
    currentValueText: '${value}',
    currentValuePlaceholderStyle: '${value}',
    labelFontSize: '14px',
    valueTextFontSize: '16px',
    valueTextBelowPos: 23,
  }

  test('check default config', () => {
    const generated_config = getConfig({
      PROPS: DEFAULT_PROPS,
      parentWidth: 500,
      parentHeight: 500,
    })

    expect(generated_config).toMatchObject(expected_config)
  })

  test('check config for fluidWidth: true, width == height', () => {
    const PROPS = {
      ...DEFAULT_PROPS,
      fluidWidth: true,
    }

    const expected_fluid_width_config = {
      ...expected_config,
      width: 500,
      height: 250,
    }

    const generated_config = getConfig({
      PROPS,
      parentWidth: 500,
      parentHeight: 500,
    })

    expect(generated_config).toMatchObject(expected_fluid_width_config)
  })

  test('check config for fluidWidth: true, width < height', () => {
    const PROPS = {
      ...DEFAULT_PROPS,
      fluidWidth: true,
    }

    const expected_fluid_width_config = {
      ...expected_config,
      width: 454,
      height: 227,
    }

    const generated_config = getConfig({
      PROPS,
      parentWidth: 500,
      parentHeight: 250,
    })

    expect(generated_config).toMatchObject(expected_fluid_width_config)
  })

  test('check config for fluidWidth: true, width > height', () => {
    const PROPS = {
      ...DEFAULT_PROPS,
      fluidWidth: true,
    }

    const expected_fluid_width_config = {
      ...expected_config,
      width: 250,
      height: 125,
    }

    const generated_config = getConfig({
      PROPS,
      parentWidth: 250,
      parentHeight: 500,
    })

    expect(generated_config).toMatchObject(expected_fluid_width_config)
  })

  test("to throw error if invalid 'customSegmentLabels' config", () => {
    const PROPS = {
      ...DEFAULT_PROPS,
      // invalid segment label config to simulate error
      customSegmentLabels: ['porumai'],
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
