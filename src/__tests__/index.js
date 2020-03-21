import React from "react"
import { isEmpty } from "lodash"
// ref: https://github.com/airbnb/enzyme/blob/master/docs/guides/migration-from-2-to-3.md
import Enzyme from "enzyme"
import Adapter from "enzyme-adapter-react-16"
Enzyme.configure({ adapter: new Adapter() })

import { shallow, mount, render } from "enzyme"

// import Button from '../index';
import ReactSpeedometer from "../index"

// import validators
import {
  calculateNeedleHeight,
  calculateScale,
  calculateTicks,
  calculateSegmentLabelCount,
} from "../core/util"

describe("<ReactSpeedometer />", () => {
  // test if it has the parent div component for the "svg"
  test("should render one parent div component", () => {
    // a wrapper that does not render the child components
    // ref: http://airbnb.io/enzyme/
    // const wrapper = shallow(<ReactSpeedometer />);
    // ref: VERSION 3 API change - https://github.com/airbnb/enzyme/blob/master/docs/guides/migration-from-2-to-3.md#lifecycle-methods
    const wrapper = shallow(<ReactSpeedometer />, {
      disableLifecycleMethods: true,
    })
    expect(wrapper.find("div")).toHaveLength(1)
  })

  // test if we component did mount is called
  test("componentDidMount => called once", () => {
    // ref: http://airbnb.io/enzyme/
    const didMountSpy = jest.spyOn(
      ReactSpeedometer.prototype,
      "componentDidMount"
    )
    const wrapper = mount(<ReactSpeedometer />)
    expect(didMountSpy).toHaveBeenCalled()
  })

  // test if we have the 'svg.speedometer'
  test("svg.speedometer is present", () => {
    // ref: http://airbnb.io/enzyme/
    const full_dom_wrapper = mount(<ReactSpeedometer />).render()
    expect(full_dom_wrapper.find("svg.speedometer").length).toBe(1)
  })

  // check if the default segments is 5 by counting 'speedo-segment'
  test("by default we should have 5 segments", () => {
    const full_dom_wrapper = mount(<ReactSpeedometer />).render()
    expect(full_dom_wrapper.find("path.speedo-segment").length).toBe(5)
  })

  // check the text color of the current value is the default (#666)
  test("should have the default text color for current value", () => {
    const full_dom_wrapper = mount(<ReactSpeedometer />).render()
    expect(full_dom_wrapper.find("text.current-value").css("fill")).toBe("#666")
  })

  // should take the color given by us in 'textColor'
  test("should have the text color given by us => steelblue ", () => {
    const full_dom_wrapper = mount(
      <ReactSpeedometer textColor="steelblue" />
    ).render()
    expect(full_dom_wrapper.find("text.current-value").css("fill")).toBe(
      "steelblue"
    )
  })

  // make sure 'componentDidUpdate' is called
  test("should call componentDidUpdate", () => {
    const full_dom_wrapper = mount(<ReactSpeedometer />)
    const spy = jest.spyOn(ReactSpeedometer.prototype, "componentDidUpdate")
    // set some props
    full_dom_wrapper.setProps({
      segments: 11,
    })
    // check if 'componentDidUpdate' gets called
    expect(spy).toHaveBeenCalled()
  })

  // should smoothly animate only the current value; not other breaking changes
  test("smooth update of values", () => {
    const value = 333
    const updatedValue = 470
    const full_dom_wrapper = mount(<ReactSpeedometer value={value} />)
    expect(
      full_dom_wrapper
        .render()
        .find("text.current-value")
        .text()
    ).toBe(value.toString())
    // confirm if our start color is the default
    expect(
      full_dom_wrapper
        .render()
        .find("path.speedo-segment")
        .get(0).attribs.fill
    ).toBe(`rgb(255, 71, 26)`) // rgb value of our default 'startColor'
    // set updated props
    full_dom_wrapper.setProps({
      value: updatedValue,
      startColor: "red",
    })
    // confirm if our value is updated
    expect(
      full_dom_wrapper
        .render()
        .find("text.current-value")
        .text()
    ).toBe(updatedValue.toString())
    // confirm our start color is intact
    expect(
      full_dom_wrapper
        .render()
        .find("path.speedo-segment")
        .get(0).attribs.fill
    ).toBe(`rgb(255, 71, 26)`) // rgb value of our default 'startColor'
  })

  // if force render is present, it should re render the whole component
  test('should rerender the whole component when "forceRender: true" ', () => {
    const full_dom_wrapper = mount(<ReactSpeedometer />)
    expect(full_dom_wrapper.render().find("path.speedo-segment").length).toBe(5)
    // change the props and give 'rerender' true
    full_dom_wrapper.setProps({
      segments: 10,
      // set force render to true so that we should get 10 segments
      forceRender: true,
    })
    expect(full_dom_wrapper.render().find("path.speedo-segment").length).toBe(
      10
    )
    // now change the forceRender option to false
    full_dom_wrapper.setProps({
      segments: 15,
      // set force render to true so that we should get 10 segments
      forceRender: false,
    })
    // the segments should remain in 10
    expect(full_dom_wrapper.render().find("path.speedo-segment").length).toBe(
      10
    )
  })

  // check the format of the values
  test("should display the format of the values correctly", () => {
    // checking the default value
    const full_dom_wrapper = mount(<ReactSpeedometer value={0} />)
    expect(
      full_dom_wrapper
        .render()
        .find("text.current-value")
        .text()
    ).toBe("0")
    // setting label format to "d" and verifying the resulting value
    let passed_value = 477.7,
      transformed_value = "478"
    // change the props
    full_dom_wrapper.setProps({
      value: passed_value,
      valueFormat: "d",
    })
    // test if the formatting reflects the expected value
    expect(
      full_dom_wrapper
        .render()
        .find("text.current-value")
        .text()
    ).toBe(transformed_value)
  })

  // check the custom value text
  test("should display custom current text value", () => {
    // checking the default value
    const full_dom_wrapper = mount(
      <ReactSpeedometer value={333} currentValueText={"Porumai: ${value}"} />
    )
    expect(
      full_dom_wrapper
        .render()
        .find("text.current-value")
        .text()
    ).toBe("Porumai: 333")
    // change props to another text
    full_dom_wrapper.setProps({
      value: 555,
      currentValueText: "Current Value: ${value}",
    })
    // test current value text reflects our new props
    expect(
      full_dom_wrapper
        .render()
        .find("text.current-value")
        .text()
    ).toBe("Current Value: 555")
  })

  // it should not break on invalid needle transition
  test("should not break on invalid needle transition", () => {
    const full_dom_wrapper = mount(
      <ReactSpeedometer needleTransition="porumaiTransition" />
    )
    expect(full_dom_wrapper.render().find("path.speedo-segment").length).toBe(5)
  })

  // [d3-scale][bug]: https://github.com/d3/d3-scale/issues/149
  // [fix] should render segments correctly when multiple speedometers are rendered
  test("should correctly show the ticks when multiple speedometers are rendered", () => {
    const full_dom_wrapper = mount(
      <div>
        <div>
          <ReactSpeedometer value={10} maxValue={200} segments={1} />
          <ReactSpeedometer value={10} maxValue={40} segments={1} />
          <ReactSpeedometer value={10} maxValue={30} segments={1} />
        </div>
      </div>
    )
    expect(full_dom_wrapper.render().find("text.segment-value").length).toBe(6)
  })

  test("should throw error on invalid needle height", () => {
    expect(() =>
      calculateNeedleHeight({ heightRatio: 1.1, radius: 2 })
    ).toThrowError()
    // this one should not throw and should return some value
    expect(() =>
      calculateNeedleHeight({ heightRatio: 0.9, radius: 2 })
    ).not.toThrowError()
    expect(typeof calculateNeedleHeight({ heightRatio: 0.9, radius: 2 })).toBe(
      "number"
    )
  })

  test("should correctly take current Value placeholder from passed props", () => {
    const current_value = 333
    const full_dom_wrapper = mount(
      <div>
        <ReactSpeedometer
          value={current_value}
          currentValuePlaceholderStyle={"#{value}"}
          currentValueText={"#{value}"}
        />
      </div>
    )
    expect(
      full_dom_wrapper
        .render()
        .find("text.current-value")
        .text()
    ).toEqual(current_value.toString())
  })

  test("scale and ticks works properly", () => {
    const min = 0
    const max = 1000
    const segments = 1000
    const max_segment_labels = 10

    const full_dom_wrapper = mount(
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

    expect(full_dom_wrapper.render().find("text.segment-value").length).toBe(
      ticks2.length
    )
  })

  test("'maxSegmentLabels' config with no labels ", () => {
    const min = 0
    const max = 1000
    let segments = 1000
    let max_segment_labels = 0
    let label_count = calculateSegmentLabelCount({
      maxSegmentLabelCount: max_segment_labels,
      segmentCount: segments,
    })

    const full_dom_wrapper = mount(
      <ReactSpeedometer
        segments={segments}
        maxSegmentLabels={max_segment_labels}
      />
    )

    const scale1 = calculateScale({ min, max, segments })
    const ticks1 = calculateTicks(scale1, { min, max, segments: label_count })
    expect(full_dom_wrapper.render().find("text.segment-value").length).toBe(
      max_segment_labels
    )
  })

  test("label and value font sizes", () => {
    const labelFontSize = "15px"
    const valueTextFontSize = "23px"

    const full_dom_wrapper = mount(
      <ReactSpeedometer
        value={333}
        needleHeightRatio={0.5}
        labelFontSize={labelFontSize}
        valueTextFontSize={valueTextFontSize}
      />
    )

    // construct styles from inline 'attribs.style'
    let styles = {}
    let label_styles = full_dom_wrapper
      .render()
      .find("text.segment-value")
      .get(0).attribs.style

    label_styles.split(";").forEach((style) => {
      const [key, value] = style.split(":")
      if (isEmpty(key) || isEmpty(value)) {
        return
      }
      styles[key.trim()] = value.trim()
    })

    expect(styles["font-size"]).toEqual(labelFontSize)

    // check for current value font size
    let current_value_styles = full_dom_wrapper
      .render()
      .find("text.current-value")
      .get(0).attribs.style

    current_value_styles.split(";").forEach((style) => {
      const [key, value] = style.split(":")
      if (isEmpty(key) || isEmpty(value)) {
        return
      }
      styles[key.trim()] = value.trim()
    })

    expect(styles["font-size"]).toEqual(valueTextFontSize)
  })
})

describe("Custom Segment Colors", () => {
  test("custom segment colors works as expected", () => {
    const segmentColors = ["red", "blue", "green"]
    const full_dom_wrapper = mount(
      <ReactSpeedometer segments={3} segmentColors={segmentColors} />
    )

    segmentColors.forEach((color, index) => {
      expect(
        full_dom_wrapper
          .render()
          .find("path.speedo-segment")
          .get(index).attribs.fill
      ).toEqual(color)
    })
  })

  test("6 custom segment colors", () => {
    const segmentColors = [
      "#e60000",
      "#e67300",
      "#e6e600",
      "#bcf5bc",
      "#228b22",
      "#ff6347",
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
        full_dom_wrapper
          .render()
          .find("path.speedo-segment")
          .get(index).attribs.fill
      ).toEqual(color)
    })
  })

  test("custom segment colors with custom segment stops ", () => {
    const segmentColors = ["firebrick", "tomato", "gold", "limegreen"]
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
        full_dom_wrapper
          .render()
          .find("path.speedo-segment")
          .get(index).attribs.fill
      ).toEqual(color)
    })
  })
})

describe("Custom segment labels", () => {
  test("custom text labels and value text are shown correctly", () => {
    const currentValueText = "Happiness Level"

    const customSegmentLabels = [
      {
        text: "Very Bad",
        position: "INSIDE",
        color: "#555",
      },
      {
        text: "Bad",
        position: "INSIDE",
        color: "#555",
      },
      {
        text: "Ok",
        position: "INSIDE",
        color: "#555",
        fontSize: "19px",
      },
      {
        text: "Good",
        position: "INSIDE",
        color: "#555",
      },
      {
        text: "Very Good",
        position: "INSIDE",
        color: "#555",
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
      const textValue = full_dom_wrapper
        .render()
        .find("text.segment-value")
        .get(index).children[0].data

      expect(textValue).toEqual(label.text)
    })
  })
})
