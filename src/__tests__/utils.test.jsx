/**
 * @vitest-environment jsdom
 */
import React from 'react'
import { render, act, screen } from '@testing-library/react'
import ReactSpeedometer from '../index'
// import validators
import {
  calculateNeedleHeight,
  calculateScale,
  calculateTicks,
  calculateSegmentLabelCount,
} from '../core/util'

describe('util functions are working fine', () => {
  test('scale and ticks works properly', () => {
    const min = 0
    const max = 1000
    const segments = 1000
    const max_segment_labels = 10

    const { container } = render(
      <ReactSpeedometer
        segments={segments}
        maxSegmentLabels={max_segment_labels}
      />
    )

    const scale1 = calculateScale({ min, max, segments })
    const ticks1 = calculateTicks(scale1, { min, max, segments })

    const scale2 = calculateScale({ min, max, segments: max_segment_labels })
    const ticks2 = calculateTicks(scale2, {
      min,
      max,
      segments: max_segment_labels,
    })

    const scale3 = calculateScale({ min, max, segments: 1 })
    const ticks3 = calculateTicks(scale3, { min, max, segments: 1 })

    expect(ticks2.length).toBeLessThan(ticks1.length)
    expect(ticks3.length).toBe(2)

    expect(container.querySelectorAll('text.segment-value')).toHaveLength(
      ticks2.length
    )
  })

  test('should throw error on invalid needle height', () => {
    expect(() =>
      calculateNeedleHeight({ heightRatio: 1.1, radius: 2 })
    ).toThrowError()
    // this one should not throw and should return some value
    expect(() =>
      calculateNeedleHeight({ heightRatio: 0.9, radius: 2 })
    ).not.toThrowError()
    expect(typeof calculateNeedleHeight({ heightRatio: 0.9, radius: 2 })).toBe(
      'number'
    )
  })

  test("'maxSegmentLabels' config with no labels ", () => {
    const min = 0
    const max = 1000
    let segments = 1000
    let max_segment_labels = 5
    let label_count = calculateSegmentLabelCount({
      maxSegmentLabelCount: max_segment_labels,
      segmentCount: segments,
    })

    const { container } = render(
      <ReactSpeedometer
        segments={segments}
        maxSegmentLabels={max_segment_labels}
      />
    )

    const scale1 = calculateScale({ min, max, segments })
    const ticks1 = calculateTicks(scale1, { min, max, segments: label_count })

    expect(container.querySelectorAll('text.segment-value').length).toEqual(
      ticks1.length
    )
  })
})
