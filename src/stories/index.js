import React, { Component } from "react"
// import { storiesOf, action, setAddon } from '@kadira/storybook';
import { storiesOf, action, setAddon } from "@storybook/react"
import infoAddon, { setDefaults, withInfo } from "@storybook/addon-info"
// knobs for showing dynamic props
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs"

// addon-info
setDefaults({
  inline: true,
  maxPropsIntoLine: 1,
  maxPropObjectKeys: 10,
  maxPropArrayLength: 10,
  maxPropStringLength: 100,
})

// set the info addon for storybook!
setAddon(infoAddon)

import ReactSpeedometer from "../index"
// NOTE: switch to dist for checking production version
// import ReactSpeedometer from "../../dist/index"

import SpeedoButton from "./speedo-button"
import MultiSpeedoMeters from "./multi-speedometers"

storiesOf("react-d3-speedometer", module)
  // Add the `withKnobs` decorator to add knobs support to your stories.
  // You can also configure `withKnobs` as a global decorator.
  // .addDecorator(withKnobs)
  .addDecorator(withInfo)
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
    () => <ReactSpeedometer maxValue={150} value={70.7} valueFormat={"d"} />,
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
  // render multiple Speedometer
  .add(
    "Render multiple Speedometer with a single segment",
    () => (
      <div>
        <ReactSpeedometer value={10} maxValue={200} segments={1} />
        <ReactSpeedometer value={10} maxValue={40} segments={1} />
        <ReactSpeedometer value={10} maxValue={30} segments={1} />
      </div>
    ),
    { source: true, inline: true, header: false }
  )
  // force render multiple Speedometer
  .add(
    "force render multiple Speedometer with a single segment",
    () => <MultiSpeedoMeters />,
    { source: true, inline: true, header: false }
  )
  .add(
    "configure needle length",
    () => <ReactSpeedometer value={333} needleHeightRatio={0.5} />,
    { source: true, inline: true, header: true }
  )
