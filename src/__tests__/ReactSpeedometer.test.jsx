/**
 * @vitest-environment happy-dom
 */

import React from 'react'
import { render, act, screen } from '@testing-library/react'
import ReactSpeedometer from '../index'

afterAll(async () => {
  // cancel async tasks to ignore svg errors
  await happyDOM.cancelAsync()
})

describe('<ReactSpeedometer />', () => {
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
    const cssValues = container.querySelector('text.current-value').style
    expect(cssValues['fill']).toBe('#666')
  })

  // should take the color given by us in 'textColor'
  test('should have the text color given by us => steelblue ', () => {
    const { container } = render(<ReactSpeedometer textColor={'steelblue'} />)
    const elem = container.querySelector('text.current-value')
    const style = elem.style
    expect(style.fill).toBe('steelblue')
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

  // if force render is present, it should re render the whole component
  test('should rerender the whole component when "forceRender: true" ', () => {
    const { container, rerender } = render(<ReactSpeedometer />)
    expect(container.querySelectorAll('path.speedo-segment')).toHaveLength(5)
    // change the props and give 'rerender' true
    // rerender the element with updated props
    // ref: https://testing-library.com/docs/example-update-props/
    rerender(<ReactSpeedometer segments={10} forceRender={true} />)
    expect(container.querySelectorAll('path.speedo-segment')).toHaveLength(10)
    // now change the forceRender option to false
    rerender(<ReactSpeedometer segments={15} forceRender={false} />)
    // the segments should remain in 10
    expect(container.querySelectorAll('path.speedo-segment')).toHaveLength(10)
  })

  // check the format of the values
  test('should display the format of the values correctly', () => {
    // checking the default value
    const { container, rerender } = render(<ReactSpeedometer />)
    expect(container.querySelector('text.current-value')).toHaveTextContent('0')
    // setting label format to "d" and verifying the resulting value
    let passed_value = 477.7,
      transformed_value = '478'
    // change the props
    rerender(<ReactSpeedometer value={passed_value} valueFormat={'d'} />)
    expect(container.querySelector('text.current-value')).toHaveTextContent(
      transformed_value
    )
  })

  // custom value formatter
  test('should render with custom segmentValueFormatter correctly', () => {
    const segmentValueFormatter = value => `${value}%`

    const { container } = render(
      <ReactSpeedometer
        value={314}
        segmentValueFormatter={segmentValueFormatter}
      />
    )

    const textNodes = container.querySelectorAll('text.segment-value')
    textNodes.forEach(node => {
      expect(node.textContent).toEqual(segmentValueFormatter(node.__data__))
    })
  })

  // check the custom value text
  test('should display custom current text value', () => {
    // checking the default value
    const { container, rerender } = render(
      <ReactSpeedometer value={333} currentValueText={'Porumai: ${value}'} />
    )
    expect(container.querySelector('text.current-value')).toHaveTextContent(
      'Porumai: 333'
    )
    // change props to another text
    rerender(
      <ReactSpeedometer
        value={555}
        currentValueText={'Current Value: ${value}'}
      />
    )
    // test current value text reflects our new props
    expect(container.querySelector('text.current-value')).toHaveTextContent(
      'Current Value: 555'
    )
  })

  // it should not break on invalid needle transition
  test('should not break on invalid needle transition', () => {
    const { container } = render(
      <ReactSpeedometer needleTransition="porumaiTransition" />
    )
    expect(container.querySelectorAll('path.speedo-segment')).toHaveLength(5)
  })

  // [d3-scale][bug]: https://github.com/d3/d3-scale/issues/149
  // [fix] should render segments correctly when multiple speedometers are rendered
  test('should correctly show the ticks when multiple speedometers are rendered', () => {
    const { container } = render(
      <div>
        <div>
          <ReactSpeedometer value={10} maxValue={200} segments={1} />
          <ReactSpeedometer value={10} maxValue={40} segments={1} />
          <ReactSpeedometer value={10} maxValue={30} segments={1} />
        </div>
      </div>
    )
    expect(container.querySelectorAll('text.segment-value')).toHaveLength(6)
  })

  test('should correctly take current Value placeholder from passed props', () => {
    const current_value = 333
    const { container } = render(
      <div>
        <ReactSpeedometer
          value={current_value}
          currentValuePlaceholderStyle={'#{value}'}
          currentValueText={'#{value}'}
        />
      </div>
    )
    expect(container.querySelector('text.current-value')).toHaveTextContent(
      current_value.toString()
    )
  })

  test('label and value font sizes, font weight', () => {
    const labelFontSize = '15px'
    const valueTextFontSize = '23px'
    const valueTextFontWeight = '500'

    const { container } = render(
      <ReactSpeedometer
        value={333}
        needleHeightRatio={0.5}
        labelFontSize={labelFontSize}
        valueTextFontSize={valueTextFontSize}
        valueTextFontWeight={valueTextFontWeight}
      />
    )
    const cssValues = container.querySelector('text.segment-value').style
    expect(cssValues.fontSize).toEqual(labelFontSize)

    const styles = container.querySelector('text.current-value').style

    expect(styles.fontSize).toEqual(valueTextFontSize)
    expect(styles.fontWeight).toEqual(valueTextFontWeight)
  })
})

describe('Custom Segment Colors', () => {
  test('custom segment colors works as expected', () => {
    const segmentColors = ['red', 'blue', 'green']
    const { container } = render(
      <ReactSpeedometer segments={3} segmentColors={segmentColors} />
    )

    const segments = container.querySelectorAll('path.speedo-segment')

    segmentColors.forEach((color, index) => {
      const segment = segments[index]
      expect(segment.getAttribute('fill')).toEqual(color)
    })
  })

  test('6 custom segment colors', () => {
    const segmentColors = [
      '#e60000',
      '#e67300',
      '#e6e600',
      '#bcf5bc',
      '#228b22',
      '#ff6347',
    ]
    const { container } = render(
      <ReactSpeedometer
        segments={6}
        segmentColors={segmentColors}
        minValue={0}
        maxValue={10}
        value={10}
        currentValueText={`1.5%`}
        height={200}
      />
    )
    const segments = container.querySelectorAll('path.speedo-segment')

    segmentColors.forEach((color, index) => {
      const segment = segments[index]
      expect(segment.getAttribute('fill')).toEqual(color)
    })
  })

  test('custom segment colors with custom segment stops ', () => {
    const segmentColors = ['firebrick', 'tomato', 'gold', 'limegreen']
    const { container } = render(
      <ReactSpeedometer
        needleHeightRatio={0.7}
        maxSegmentLabels={5}
        segments={3}
        customSegmentStops={[0, 500, 750, 900, 1000]}
        segmentColors={segmentColors}
        value={333}
      />
    )
    const segments = container.querySelectorAll('path.speedo-segment')

    segmentColors.forEach((color, index) => {
      const segment = segments[index]
      expect(segment.getAttribute('fill')).toEqual(color)
    })
  })
})

describe('Custom segment labels', () => {
  test('custom text labels and value text are shown correctly', () => {
    const currentValueText = 'Happiness Level'

    const customSegmentLabels = [
      {
        text: 'Very Bad',
        position: 'INSIDE',
        color: '#555',
      },
      {
        text: 'Bad',
        position: 'INSIDE',
        color: '#555',
      },
      {
        text: 'Ok',
        position: 'INSIDE',
        color: '#555',
        fontSize: '19px',
      },
      {
        text: 'Good',
        position: 'INSIDE',
        color: '#555',
      },
      {
        text: 'Very Good',
        position: 'INSIDE',
        color: '#555',
      },
    ]

    const { container } = render(
      <ReactSpeedometer
        width={500}
        needleHeightRatio={0.7}
        value={777}
        currentValueText={currentValueText}
        customSegmentLabels={customSegmentLabels}
        ringWidth={47}
      />
    )

    const textNodes = container.querySelectorAll('text.segment-value')

    customSegmentLabels.forEach((label, index) => {
      const textNode = textNodes[index]
      const styles = textNode.style

      expect(textNode.textContent).toEqual(label.text)
      expect(styles['fill']).toEqual(label.color)

      if (label.fontSize) {
        expect(styles.fontSize).toEqual(label.fontSize)
      }
    })
  })
})
