/**
 * @vitest-environment happy-dom
 */

import React from 'react'
import isEmpty from 'lodash-es/isEmpty'

import { vi } from 'vitest'

// ref: https://github.com/enzymejs/enzyme/issues/2429
import Enzyme from 'enzyme'
// NOTE: to be replaced with official adapter once released
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
Enzyme.configure({ adapter: new Adapter() })

import { shallow, mount } from 'enzyme'

import ReactSpeedometer from '../index'

describe('<ReactSpeedometer />', () => {
  // if force render is present, it should re render the whole component
  test('should rerender the whole component when "forceRender: true" ', () => {
    const full_dom_wrapper = mount(<ReactSpeedometer />)
    expect(full_dom_wrapper.render().find('path.speedo-segment').length).toBe(5)
    // change the props and give 'rerender' true
    full_dom_wrapper.setProps({
      segments: 10,
      // set force render to true so that we should get 10 segments
      forceRender: true,
    })
    expect(full_dom_wrapper.render().find('path.speedo-segment').length).toBe(
      10
    )
    // now change the forceRender option to false
    full_dom_wrapper.setProps({
      segments: 15,
      // set force render to true so that we should get 10 segments
      forceRender: false,
    })
    // the segments should remain in 10
    expect(full_dom_wrapper.render().find('path.speedo-segment').length).toBe(
      10
    )
  })

  // check the format of the values
  test('should display the format of the values correctly', () => {
    // checking the default value
    const full_dom_wrapper = mount(<ReactSpeedometer value={0} />)
    expect(full_dom_wrapper.render().find('text.current-value').text()).toBe(
      '0'
    )
    // setting label format to "d" and verifying the resulting value
    let passed_value = 477.7,
      transformed_value = '478'
    // change the props
    full_dom_wrapper.setProps({
      value: passed_value,
      valueFormat: 'd',
    })
    // test if the formatting reflects the expected value
    expect(full_dom_wrapper.render().find('text.current-value').text()).toBe(
      transformed_value
    )
  })

  // check the custom value text
  test('should display custom current text value', () => {
    // checking the default value
    const full_dom_wrapper = mount(
      <ReactSpeedometer value={333} currentValueText={'Porumai: ${value}'} />
    )
    expect(full_dom_wrapper.render().find('text.current-value').text()).toBe(
      'Porumai: 333'
    )
    // change props to another text
    full_dom_wrapper.setProps({
      value: 555,
      currentValueText: 'Current Value: ${value}',
    })
    // test current value text reflects our new props
    expect(full_dom_wrapper.render().find('text.current-value').text()).toBe(
      'Current Value: 555'
    )
  })

  // it should not break on invalid needle transition
  test('should not break on invalid needle transition', () => {
    const full_dom_wrapper = mount(
      <ReactSpeedometer needleTransition="porumaiTransition" />
    )
    expect(full_dom_wrapper.render().find('path.speedo-segment').length).toBe(5)
  })

  // [d3-scale][bug]: https://github.com/d3/d3-scale/issues/149
  // [fix] should render segments correctly when multiple speedometers are rendered
  test('should correctly show the ticks when multiple speedometers are rendered', () => {
    const full_dom_wrapper = mount(
      <div>
        <div>
          <ReactSpeedometer value={10} maxValue={200} segments={1} />
          <ReactSpeedometer value={10} maxValue={40} segments={1} />
          <ReactSpeedometer value={10} maxValue={30} segments={1} />
        </div>
      </div>
    )
    expect(full_dom_wrapper.render().find('text.segment-value').length).toBe(6)
  })

  test('should correctly take current Value placeholder from passed props', () => {
    const current_value = 333
    const full_dom_wrapper = mount(
      <div>
        <ReactSpeedometer
          value={current_value}
          currentValuePlaceholderStyle={'#{value}'}
          currentValueText={'#{value}'}
        />
      </div>
    )
    expect(full_dom_wrapper.render().find('text.current-value').text()).toEqual(
      current_value.toString()
    )
  })

  test('label and value font sizes, font weight', () => {
    const labelFontSize = '15px'
    const valueTextFontSize = '23px'
    const valueTextFontWeight = '500'

    const full_dom_wrapper = mount(
      <ReactSpeedometer
        value={333}
        needleHeightRatio={0.5}
        labelFontSize={labelFontSize}
        valueTextFontSize={valueTextFontSize}
        valueTextFontWeight={valueTextFontWeight}
      />
    )

    // construct styles from inline 'attribs.style'
    let styles = {}
    let label_styles = full_dom_wrapper
      .render()
      .find('text.segment-value')
      .get(0).attribs.style

    label_styles.split(';').forEach(style => {
      const [key, value] = style.split(':')
      if (isEmpty(key) || isEmpty(value)) {
        return
      }
      styles[key.trim()] = value.trim()
    })

    expect(styles['font-size']).toEqual(labelFontSize)

    // check for current value font size
    let current_value_styles = full_dom_wrapper
      .render()
      .find('text.current-value')
      .get(0).attribs.style

    current_value_styles.split(';').forEach(style => {
      const [key, value] = style.split(':')
      if (isEmpty(key) || isEmpty(value)) {
        return
      }
      styles[key.trim()] = value.trim()
    })

    expect(styles['font-size']).toEqual(valueTextFontSize)
    expect(styles['font-weight']).toEqual(valueTextFontWeight)
  })
})

describe('Custom Segment Colors', () => {
  test('custom segment colors works as expected', () => {
    const segmentColors = ['red', 'blue', 'green']
    const full_dom_wrapper = mount(
      <ReactSpeedometer segments={3} segmentColors={segmentColors} />
    )

    segmentColors.forEach((color, index) => {
      expect(
        full_dom_wrapper.render().find('path.speedo-segment').get(index).attribs
          .fill
      ).toEqual(color)
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
    const full_dom_wrapper = mount(
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

    segmentColors.forEach((color, index) => {
      expect(
        full_dom_wrapper.render().find('path.speedo-segment').get(index).attribs
          .fill
      ).toEqual(color)
    })
  })

  test('custom segment colors with custom segment stops ', () => {
    const segmentColors = ['firebrick', 'tomato', 'gold', 'limegreen']
    const full_dom_wrapper = mount(
      <ReactSpeedometer
        needleHeightRatio={0.7}
        maxSegmentLabels={5}
        segments={3}
        customSegmentStops={[0, 500, 750, 900, 1000]}
        segmentColors={segmentColors}
        value={333}
      />
    )

    segmentColors.forEach((color, index) => {
      expect(
        full_dom_wrapper.render().find('path.speedo-segment').get(index).attribs
          .fill
      ).toEqual(color)
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

    const full_dom_wrapper = mount(
      <ReactSpeedometer
        width={500}
        needleHeightRatio={0.7}
        value={777}
        currentValueText={currentValueText}
        customSegmentLabels={customSegmentLabels}
        ringWidth={47}
      />
    )

    customSegmentLabels.forEach((label, index) => {
      const textNode = full_dom_wrapper
        .render()
        .find('text.segment-value')
        .get(index)

      const textValue = textNode.children[0].data
      const raw_styles = textNode.attribs.style.split(';')
      let styles = {}
      // construct the styles
      raw_styles.forEach(style => {
        if (style === '') {
          return
        }
        const [key, value] = style.split(':')
        styles[key.trim()] = value.trim()
      })

      expect(textValue).toEqual(label.text)
      expect(styles['fill']).toEqual(label.color)

      if (label.fontSize) {
        expect(styles['font-size']).toEqual(label.fontSize)
      }
    })
  })
})
