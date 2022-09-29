import React from 'react'
import { Button } from '@storybook/react/demo'
import { storiesOf } from '@storybook/react'

// DEVELOPMENT
import ReactSpeedometer from '../index'
// PRODUCTION: switch to dist for checking production version
// import ReactSpeedometer from "../../dist/index"

import SpeedoButton from './speedo-button'
import MultiSpeedoMeters from './multi-speedometers'
import AutoRefresh from './auto-refresh'

export default {
  title: `<ReactSpeedometer>`,
}

const textColor = '#AAA'

// ---------------------------------------------------
// START: Stories
// ---------------------------------------------------

export const DefaultWithNoConfig = () => (
  <ReactSpeedometer textColor={textColor} />
)

export const ConfiguringValues = () => (
  <ReactSpeedometer
    maxValue={500}
    value={473}
    needleColor="red"
    startColor="green"
    segments={10}
    endColor="blue"
    textColor={textColor}
  />
)

export const CustomSegmentLabels = () => (
  <div>
    <div>
      <ReactSpeedometer
        width={500}
        needleHeightRatio={0.7}
        value={777}
        currentValueText="Happiness Level"
        customSegmentLabels={[
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
        ]}
        ringWidth={47}
        needleTransitionDuration={3333}
        needleTransition="easeElastic"
        needleColor={'#90f2ff'}
        textColor={'#d8dee9'}
      />
    </div>
    <div>
      <ReactSpeedometer
        width={500}
        needleHeightRatio={0.7}
        value={777}
        customSegmentStops={[0, 250, 750, 1000]}
        segmentColors={['#9399ff', '#14ffec', '#00bbf0']}
        currentValueText="How are you?"
        customSegmentLabels={[
          {
            text: 'Good',
            position: 'OUTSIDE',
            color: '#d8dee9',
          },
          {
            text: 'Great',
            position: 'OUTSIDE',
            color: '#d8dee9',
          },
          {
            text: 'Awesome!',
            position: 'OUTSIDE',
            color: '#d8dee9',
          },
        ]}
        ringWidth={47}
        needleTransitionDuration={3333}
        needleTransition="easeElastic"
        needleColor={'#a7ff83'}
        textColor={'#d8dee9'}
      />
    </div>
  </div>
)

export const CustomSegmentColors = () => (
  <div>
    <div>
      <ReactSpeedometer
        segments={3}
        value={470}
        segmentColors={['#FF9933', '#ECEFF4', '#138808']}
        needleColor="#000080"
        textColor={textColor}
      />
    </div>
    <div>
      <ReactSpeedometer
        segments={3}
        value={470}
        segmentColors={['#0055A4', '#ECEFF4', '#EF4135']}
        needleColor="lightgreen"
        textColor={textColor}
      />
    </div>
  </div>
)

export const CustomSegmentStops = () => (
  <div>
    <ReactSpeedometer
      needleHeightRatio={0.7}
      maxSegmentLabels={5}
      segments={3}
      customSegmentStops={[0, 500, 750, 900, 1000]}
      segmentColors={['firebrick', 'tomato', 'gold', 'limegreen']}
      value={333}
      textColor={textColor}
    />
    <ReactSpeedometer
      forceRender={true}
      maxSegmentLabels={1}
      customSegmentStops={[500, 777, 1000]}
      segmentColors={['#5959ac', '#AAA']}
      needleColor={'#5959ac'}
      currentValueText={'Current Value: ${value}'}
      minValue={500}
      maxValue={1000}
      value={777}
      textColor={textColor}
    />
    <ReactSpeedometer
      forceRender={true}
      maxSegmentLabels={1}
      // customSegmentStops={[500, 777, 1000]}
      segmentColors={['tomato', 'gold']}
      needleColor={'#5959ac'}
      currentValueText={'Current Value: ${value}'}
      minValue={-120}
      maxValue={0}
      value={-100}
      customSegmentStops={[-120, -100, 0]}
      textColor={textColor}
    />
  </div>
)

export const FluidWidthView = () => (
  <div
    style={{
      width: '500px',
      height: '300px',
    }}
  >
    <ReactSpeedometer
      fluidWidth={true}
      minValue={100}
      maxValue={500}
      value={473}
      needleColor="steelblue"
      textColor={textColor}
    />
  </div>
)

export const NeedleTransitionDuration = () => (
  <ReactSpeedometer
    value={333}
    needleColor="steelblue"
    needleTransitionDuration={4000}
    needleTransition="easeElastic"
    textColor={textColor}
  />
)

export const ForceRenderTheComponent = () => <SpeedoButton />

export const ConfiguringTheFormatForValuesDisplayed = () => (
  <>
    <ReactSpeedometer
      maxValue={150}
      value={70.7}
      valueFormat={'d'}
      customSegmentStops={[0, 50, 70, 90, 150]}
      segmentColors={['#bf616a', '#d08770', '#ebcb8b', '#a3be8c']}
      textColor={textColor}
    />
    <ReactSpeedometer
      maxValue={150}
      value={70.7}
      segments={5}
      valueFormat={'d'}
      textColor={textColor}
    />
  </>
)

function segmentValueFormatter(value) {
  if (value < 200) {
    return `${value} 😒`
  }
  if (value < 400) {
    return `${value} 😐`
  }
  if (value < 600) {
    return `${value} 😌`
  }
  if (value < 800) {
    return `${value} 😊`
  }
  if (value < 900) {
    return `${value} 😉`
  }

  return `${value} 😇`
}

// custom value formatter
export const CustomSegmentValueFormatter = () => (
  <ReactSpeedometer
    value={333}
    needleColor="steelblue"
    segmentValueFormatter={segmentValueFormatter}
    textColor={'#eee'}
    paddingHorizontal={34}
    paddingVertical={34}
  />
)

export const CustomCurrentValueText = () => (
  <ReactSpeedometer
    value={333}
    needleColor="steelblue"
    needleTransitionDuration={4000}
    needleTransition="easeElastic"
    currentValueText="Current Value: ${value}"
    textColor={textColor}
  />
)

export const CustomCurrentValuePlaceholderStyleForEgValue = () => (
  <ReactSpeedometer
    value={333}
    needleColor="steelblue"
    needleTransitionDuration={4000}
    needleTransition="easeElastic"
    currentValueText="Current Value: #{value}"
    currentValuePlaceholderStyle={'#{value}'}
    textColor={textColor}
  />
)

export const ConfigureNeedleLengthAndFontSizes = () => (
  <ReactSpeedometer
    value={333}
    needleHeightRatio={0.5}
    labelFontSize={'15px'}
    valueTextFontSize={'23px'}
    textColor={textColor}
  />
)

export const GradientEffectWithLargeNumberOfSegmentsAndMaxSegmentLabelsConfig = () => (
  <ReactSpeedometer
    needleHeightRatio={0.7}
    maxSegmentLabels={5}
    segments={5555}
    value={333}
    textColor={textColor}
  />
)

export const NoSegmentLabels = () => (
  <div>
    <div>
      <ReactSpeedometer
        maxSegmentLabels={0}
        segments={5555}
        textColor={textColor}
      />
    </div>

    <div>
      <ReactSpeedometer
        maxSegmentLabels={0}
        segments={4}
        value={333}
        startColor={'#2E3440'}
        endColor={'#4C566A'}
        needleColor="#D8DEE9"
        textColor={textColor}
      />
    </div>
  </div>
)

export const CustomizeFontSizesAndSpacing = () => (
  <ReactSpeedometer
    value={333}
    labelFontSize={'31px'}
    valueTextFontSize={'37px'}
    valueTextFontWeight={'500'}
    paddingHorizontal={17}
    paddingVertical={17}
    currentValueText={'Value: ${value}'}
    textColor={textColor}
  />
)

// ---------------------------------------------------
// END: Stories
// ---------------------------------------------------
