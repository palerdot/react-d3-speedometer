import React from "react"

// ref: https://github.com/airbnb/enzyme/blob/master/docs/guides/migration-from-2-to-3.md
import Enzyme from "enzyme"
import Adapter from "enzyme-adapter-react-16"
Enzyme.configure({ adapter: new Adapter() })

import { shallow, mount, render } from "enzyme"

import { expect } from "chai"
// TODO: move to jest
// import { expect } from "jest"
import sinon from "sinon"

// import Button from '../index';
import ReactSpeedometer from "../index"

// import validators
import { calculateNeedleHeight } from "../util/validators"

const { describe, it } = global

describe("<ReactSpeedometer />", () => {
  // test if it has the parent div component for the "svg"
  it("should render one parent div component", () => {
    // a wrapper that does not render the child components
    // ref: http://airbnb.io/enzyme/
    // const wrapper = shallow(<ReactSpeedometer />);
    // ref: VERSION 3 API change - https://github.com/airbnb/enzyme/blob/master/docs/guides/migration-from-2-to-3.md#lifecycle-methods
    const wrapper = shallow(<ReactSpeedometer />, {
      disableLifecycleMethods: true
    })
    expect(wrapper.find("div")).to.have.length(1)
  })

  // test if we component did mount is called
  it("componentDidMount => called once", () => {
    // ref: http://airbnb.io/enzyme/
    sinon.spy(ReactSpeedometer.prototype, "componentDidMount")
    const wrapper = mount(<ReactSpeedometer />)
    // expect( wrapper.find('svg') ).to.have.length(1);
    expect(ReactSpeedometer.prototype.componentDidMount.calledOnce).to.equal(true)
  })

  // test if we have the 'svg.speedometer'
  it("svg.speedometer is present", () => {
    // ref: http://airbnb.io/enzyme/
    const full_dom_wrapper = mount(<ReactSpeedometer />).render()
    expect(full_dom_wrapper.find("svg.speedometer").length).to.equal(1)
  })

  // check if the default segments is 5 by counting 'speedo-segment'
  it("by default we should have 5 segments", () => {
    const full_dom_wrapper = mount(<ReactSpeedometer />).render()
    expect(full_dom_wrapper.find("path.speedo-segment").length).to.equal(5)
  })

  // check the text color of the current value is the default (#666)
  it("should have the default text color for current value", () => {
    const full_dom_wrapper = mount(<ReactSpeedometer />).render()
    expect(full_dom_wrapper.find("text.current-value").css("fill")).to.equal("#666")
  })

  // should take the color given by us in 'textColor'
  it("should have the text color given by us => steelblue ", () => {
    const full_dom_wrapper = mount(<ReactSpeedometer textColor="steelblue" />).render()
    expect(full_dom_wrapper.find("text.current-value").css("fill")).to.equal("steelblue")
  })

  // make sure 'componentDidUpdate' is called
  it("should call componentDidUpdate", () => {
    const full_dom_wrapper = mount(<ReactSpeedometer />)
    const spy = sinon.spy(ReactSpeedometer.prototype, "componentDidUpdate")
    // set some props
    full_dom_wrapper.setProps({
      segments: 11
    })
    // check if 'componentDidUpdate' gets called
    expect(spy.calledOnce).to.equal(true)
  })

  // if force render is present, it should re render the whole component
  it('should rerender the whole component when "forceRender: true" ', () => {
    const full_dom_wrapper = mount(<ReactSpeedometer />)
    expect(full_dom_wrapper.render().find("path.speedo-segment").length).to.equal(5)
    // change the props and give 'rerender' true
    full_dom_wrapper.setProps({
      segments: 10,
      // set force render to true so that we should get 10 segments
      forceRender: true
    })
    expect(full_dom_wrapper.render().find("path.speedo-segment").length).to.equal(10)
    // now change the forceRender option to false
    full_dom_wrapper.setProps({
      segments: 15,
      // set force render to true so that we should get 10 segments
      forceRender: false
    })
    // the segments should remain in 10
    expect(full_dom_wrapper.render().find("path.speedo-segment").length).to.equal(10)
  })

  // check the format of the values
  it("should display the format of the values correctly", () => {
    // checking the default value
    const full_dom_wrapper = mount(<ReactSpeedometer value={0} />)
    expect(
      full_dom_wrapper
        .render()
        .find("text.current-value")
        .text()
    ).to.equal("0")
    // setting label format to "d" and verifying the resulting value
    let passed_value = 477.7,
      transformed_value = "478"
    // change the props
    full_dom_wrapper.setProps({
      value: passed_value,
      valueFormat: "d"
    })
    // test if the formatting reflects the expected value
    expect(
      full_dom_wrapper
        .render()
        .find("text.current-value")
        .text()
    ).to.equal(transformed_value)
  })

  // check the custom value text
  it("should display custom current text value", () => {
    // checking the default value
    const full_dom_wrapper = mount(<ReactSpeedometer value={333} currentValueText={"Porumai: ${value}"} />)
    expect(
      full_dom_wrapper
        .render()
        .find("text.current-value")
        .text()
    ).to.equal("Porumai: 333")
    // change props to another text
    full_dom_wrapper.setProps({
      value: 555,
      currentValueText: "Current Value: ${value}"
    })
    // test current value text reflects our new props
    expect(
      full_dom_wrapper
        .render()
        .find("text.current-value")
        .text()
    ).to.equal("Current Value: 555")
  })

  // it should not break on invalid needle transition
  it("should not break on invalid needle transition", () => {
    const full_dom_wrapper = mount(<ReactSpeedometer needleTransition="porumaiTransition" />)
    expect(full_dom_wrapper.render().find("path.speedo-segment").length).to.equal(5)
  })

  // [d3-scale][bug]: https://github.com/d3/d3-scale/issues/149
  // [fix] should render segments correctly when multiple speedometers are rendered
  it("should correctly show the ticks when multiple speedometers are rendered", () => {
    const full_dom_wrapper = mount(
      <div>
        <div>
          <ReactSpeedometer value={10} maxValue={200} segments={1} />
          <ReactSpeedometer value={10} maxValue={40} segments={1} />
          <ReactSpeedometer value={10} maxValue={30} segments={1} />
        </div>
      </div>
    )
    expect(full_dom_wrapper.render().find("text.segment-value").length).to.equal(6)
  })

  it("should throw error on invalid needle height", () => {
    expect(() => calculateNeedleHeight(1.1, 2)).to.throw()
    // this one should not throw and should return some value
    expect(() => calculateNeedleHeight(0.9, 2)).to.not.throw()
    expect(calculateNeedleHeight(0.9, 2)).to.be.a("number")
  })
})
