/**
 * @vitest-environment jsdom
 */

import React from 'react'
import { render, act, screen } from '@testing-library/react'
import ReactSpeedometer from '../index'

// SVG JSDOM issues: https://github.com/jsdom/jsdom/issues/2531

describe('react-d3-speedometer works fine', () => {
  test('Default value is displayed correctly', () => {
    const { container } = render(<ReactSpeedometer />)
    expect(container.querySelector('text.current-value')).toHaveTextContent('0')
  })

  test('Default prop value is shown correctly', () => {
    const { container } = render(<ReactSpeedometer value={333} />)
    expect(container.querySelector('text.current-value')).toHaveTextContent(
      '333'
    )
  })

  test('svg.speedometer is present', () => {
    const { container } = render(<ReactSpeedometer />)
    expect(container.querySelectorAll('svg.speedometer')).toHaveLength(1)
  })

  // check if the default segments is 5 by counting 'speedo-segment'
  test('by default we should have 5 segments', () => {
    const { container } = render(<ReactSpeedometer />)
    expect(container.querySelectorAll('path.speedo-segment')).toHaveLength(5)
  })

  // check the text color of the current value is the default (#666)
  test('should have the default text color for current value', () => {
    const { container } = render(<ReactSpeedometer />)
    const cssValues =
      container.querySelector('text.current-value').style['_values']
    expect(cssValues['fill']).toBe('#666')
  })

  // should take the color given by us in 'textColor'
  test('should have the text color given by us => steelblue ', () => {
    const { container } = render(<ReactSpeedometer textColor={'steelblue'} />)
    const cssValues =
      container.querySelector('text.current-value').style['_values']
    expect(cssValues['fill']).toBe('steelblue')
  })

  // default aria-label
  test('Default aria-label', () => {
    const { container } = render(<ReactSpeedometer />)
    const ariaLabel = container
      .querySelector('svg.speedometer')
      .getAttribute('aria-label')
    expect(ariaLabel).toBe('React d3 speedometer')
  })

  // aria-label when using svgAriaLabel
  test('Custom aria-label when svgAriaLabel is used', () => {
    const svgAriaLabel = 'My custom SVG aria label'
    const { container } = render(
      <ReactSpeedometer svgAriaLabel={svgAriaLabel} />
    )
    const ariaLabel = container
      .querySelector('svg.speedometer')
      .getAttribute('aria-label')
    expect(ariaLabel).toBe(svgAriaLabel)
  })

  // should smoothly animate only the current value; not other breaking changes
  test('smooth update of values', () => {
    const value = 333
    const updatedValue = 470
    const { container, rerender } = render(<ReactSpeedometer value={value} />)
    expect(container.querySelector('text.current-value')).toHaveTextContent(
      value.toString()
    )
    const defaultStartColor = 'rgb(255, 71, 26)'
    const firstSegment = container.querySelectorAll('path.speedo-segment')[0]
    const firstFill = firstSegment.getAttribute('fill')
    expect(firstFill).toEqual(defaultStartColor)

    // rerender the element with updated props
    // ref: https://testing-library.com/docs/example-update-props/
    rerender(<ReactSpeedometer value={updatedValue} startColor={'green'} />)

    // confirm if our value is updated
    expect(container.querySelector('text.current-value')).toHaveTextContent(
      updatedValue.toString()
    )
    // confirm our start color is intact
    const updatedFill = container
      .querySelectorAll('path.speedo-segment')[0]
      .getAttribute('fill')
    expect(updatedFill).toEqual(defaultStartColor)
  })
})
