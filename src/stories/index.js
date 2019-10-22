import React, { Component } from "react"
import { addParameters, configure, addDecorator } from "@storybook/react"
import { themes } from "@storybook/theming"
// import { storiesOf, action, setAddon } from '@kadira/storybook';
import { storiesOf, action, setAddon } from "@storybook/react"
import infoAddon, { setDefaults, withInfo } from "@storybook/addon-info"

addParameters({
  options: {
    name: "<ReactSpeedometer />",
    showPanel: false,
  },
})

// // addon-info
// setDefaults({
//   inline: true,
//   maxPropsIntoLine: 1,
//   maxPropObjectKeys: 100,
// })

// // set the info addon for storybook!
// setAddon(infoAddon)

addDecorator(
  withInfo({
    inline: true,
    maxPropObjectKeys: 100,
    maxPropArrayLength: 1000,
  })
)

// DEVELOPMENT
import ReactSpeedometer from "../index"
// PRODUCTION: switch to dist for checking production version
// import ReactSpeedometer from "../../dist/index"

import SpeedoButton from "./speedo-button"
import MultiSpeedoMeters from "./multi-speedometers"
import AutoRefresh from "./auto-refresh"

storiesOf("react-d3-speedometer", module)
  // Add the `withKnobs` decorator to add knobs support to your stories.
  // You can also configure `withKnobs` as a global decorator.
  // .addDecorator(withKnobs)
  // .addDecorator(withInfo)
  // default view with no configuration
  .add("Default with no config", () => <ReactSpeedometer />)
  // configuring values
  .add(
    "Configuring values",
    () => (
      <ReactSpeedometer
        maxValue={500}
        value={473}
        needleColor="red"
        startColor="green"
        segments={10}
        endColor="blue"
        textColor="grey"
      />
    ),
    {
      source: true,
      inline: true,
      header: false,
    }
  )
  // custom colors
  .add(
    "Custom segment colors",
    () => (
      <div>
        <div>
          <ReactSpeedometer
            maxSegmentLabels={12}
            segments={3}
            value={470}
            segmentColors={["#FF9933", "#ECEFF4", "#138808"]}
            needleColor="#000080"
          />
        </div>
        <div>
          <ReactSpeedometer
            maxSegmentLabels={12}
            segments={3}
            value={470}
            segmentColors={["#0055A4", "#ECEFF4", "#EF4135"]}
            needleColor="lightgreen"
          />
        </div>
      </div>
    ),
    { source: true, inline: true, header: true }
  )
  .add(
    "Custom Segment Stops",
    () => (
      <div>
        <ReactSpeedometer
          needleHeightRatio={0.7}
          maxSegmentLabels={5}
          segments={3}
          customSegmentStops={[0, 500, 750, 900, 1000]}
          segmentColors={["firebrick", "tomato", "gold", "limegreen"]}
          value={333}
        />
        <ReactSpeedometer
          forceRender={true}
          maxSegmentLabels={1}
          customSegmentStops={[500, 777, 1000]}
          segmentColors={["#5959ac", "#AAA"]}
          needleColor={"#5959ac"}
          currentValueText={"Current Value: ${value}"}
          minValue={500}
          maxValue={1000}
          value={777}
        />
        <ReactSpeedometer
          forceRender={true}
          maxSegmentLabels={1}
          // customSegmentStops={[500, 777, 1000]}
          segmentColors={["tomato", "gold"]}
          needleColor={"#5959ac"}
          currentValueText={"Current Value: ${value}"}
          minValue={-120}
          maxValue={0}
          value={-100}
          customSegmentStops={[-120, -100, 0]}
        />
      </div>
    ),
    { source: true, inline: true, header: true }
  )
  // fluid display view
  .add(
    "Fluid Width view",
    () => (
      <div
        style={{
          width: "500px",
          height: "300px",
          background: "#EFEFEF",
        }}
      >
        <ReactSpeedometer
          fluidWidth={true}
          minValue={100}
          maxValue={500}
          value={473}
          needleColor="steelblue"
        />
      </div>
    ),
    {
      info: {
        text: `
        Fluid width takes the width of the parent div
        `,
      },
    }
  )
  // needle transition duration
  .add(
    "Needle Transition Duration",
    () => (
      <ReactSpeedometer
        value={333}
        needleColor="steelblue"
        needleTransitionDuration={4000}
        needleTransition="easeElastic"
      />
    ),
    {
      source: true,
      inline: true,
      header: false,
    }
  )
  // knobs for demonstrating force render
  .add("force render the component", () => <SpeedoButton />, {
    info: {
      text: `
      By default, on props change only the current value and needle transition is updated. 
      Force render completly re-renders the whole component on update. 
      This is helpful for features like dynmaic width/height on resize
      `,
    },
  })
  // configuring format of the value
  .add(
    "Configuring the format for values displayed",
    () => (
      <>
        <ReactSpeedometer
          maxValue={150}
          value={70.7}
          valueFormat={"d"}
          customSegmentStops={[0, 50, 70, 90, 150]}
          segmentColors={["#bf616a", "#d08770", "#ebcb8b", "#a3be8c"]}
        />
        <ReactSpeedometer
          maxValue={150}
          value={70.7}
          segments={5}
          valueFormat={"d"}
        />
      </>
    ),
    {}
  )
  // custom value text
  .add(
    "Custom Current Value Text",
    () => (
      <ReactSpeedometer
        value={333}
        needleColor="steelblue"
        needleTransitionDuration={4000}
        needleTransition="easeElastic"
        currentValueText="Current Value: ${value}"
      />
    ),
    { source: true, inline: true, header: false }
  )
  // configure current value placeholder style
  .add(
    "Custom Current Value Placeholder Style ... (for eg: #{value} ...)",
    () => (
      <ReactSpeedometer
        value={333}
        needleColor="steelblue"
        needleTransitionDuration={4000}
        needleTransition="easeElastic"
        currentValueText="Current Value: #{value}"
        currentValuePlaceholderStyle={"#{value}"}
      />
    ),
    {
      info: {
        text: `
          Configure the current Value placeholder with custom style. For eg: you can use ruby like interpolation by giving following props:
          currentValueText=**"Current Value: #{value}"**
          currentValuePlaceholderStyle=**{"#{value}"}**. This is also helpful if you face 'no-template-curly-in-string' eslint warnings
        `,
      },
    }
  )
  // // force render multiple Speedometer
  // .add(
  //   "force render multiple Speedometer with a single segment",
  //   () => <MultiSpeedoMeters />,
  //   { source: true, inline: true, header: false }
  // )
  .add(
    "configure needle length and font sizes",
    () => (
      <ReactSpeedometer
        value={333}
        needleHeightRatio={0.5}
        labelFontSize={"15px"}
        valueTextFontSize={"23px"}
      />
    ),
    { source: true, inline: true, header: true }
  )
  .add(
    "Gradient effect with large number of segments and 'maxSegmentLabels' config",
    () => (
      <ReactSpeedometer
        needleHeightRatio={0.7}
        maxSegmentLabels={5}
        segments={1000}
        value={333}
      />
    ),
    { source: true, inline: true, header: true }
  )
  .add(
    "No segment Labels",
    () => (
      <div>
        <div>
          <ReactSpeedometer maxSegmentLabels={0} segments={1000} />
        </div>

        <div>
          <ReactSpeedometer
            maxSegmentLabels={0}
            segments={4}
            value={333}
            startColor={"#2E3440"}
            endColor={"#4C566A"}
            needleColor="#D8DEE9"
          />
        </div>
      </div>
    ),
    { source: true, inline: true, header: true }
  )
// .add("Auto Refresh Segments", () => <AutoRefresh />)
