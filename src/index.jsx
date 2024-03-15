import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { format as d3Format } from 'd3-format'
import { select as d3Select } from 'd3-selection'

import {
  getConfig,
  DEFAULT_PROPS,
  updateConfig,
  defaultSegmentValueFormatter,
} from './core/config'
import { render, update } from './core/render'
import { CustomSegmentLabelPosition, Transition } from './core/enums'

class ReactSpeedometer extends PureComponent {
  static displayName = 'ReactSpeedometer'

  constructor(props) {
    super(props)

    // list of d3 refs to share within the components
    this.d3_refs = {
      pointer: false,
      current_value_text: false,
    }
  }

  componentDidMount() {
    // render the gauge here
    this.renderGauge()
  }

  render = () => {
    return <div ref={ref => (this.gaugeDiv = ref)} />
  }

  componentDidUpdate() {
    // on update, check if 'forceRender' option is present;
    if (this.props.forceRender) {
      this.renderGauge()
    } else {
      // let us just animate the value of the speedometer
      this.updateReadings()
    }
  }

  renderGauge() {
    this.config = getConfig({
      PROPS: this.props,
      parentWidth: this.gaugeDiv.parentNode.clientWidth,
      parentHeight: this.gaugeDiv.parentNode.clientHeight,
    })

    // remove existing gauge (if any)
    d3Select(this.gaugeDiv).select('svg').remove()

    this.d3_refs = render({
      container: this.gaugeDiv,
      config: this.config,
    })

    update({
      d3_refs: this.d3_refs,
      newValue: this.props.value,
      config: this.config,
    })
  }

  updateReadings() {
    this.config = updateConfig(this.config, {
      labelFormat: d3Format(this.props.valueFormat || ''),
      // consider custom value formatter if changed
      segmentValueFormatter:
        this.props.segmentValueFormatter || defaultSegmentValueFormatter,
      currentValueText: this.props.currentValueText || '${value}',
    })

    // updates the readings of the gauge with the current prop value
    // animates between old prop value and current prop value
    update({
      d3_refs: this.d3_refs,
      newValue: this.props.value || 0,
      config: this.config,
    })
  }
}

// define the proptypes
// make all the props and 'required' and provide sensible default in the 'defaultProps'
ReactSpeedometer.propTypes = {
  value: PropTypes.number.isRequired,
  minValue: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,

  // tracks if the component should update as the whole or just animate the value
  // default will just animate the value after initialization/mounting
  forceRender: PropTypes.bool.isRequired,

  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  // text padding horizontal/vertical
  paddingHorizontal: PropTypes.number.isRequired,
  paddingVertical: PropTypes.number.isRequired,

  dimensionUnit: PropTypes.string.isRequired, // width/height dimension ... default "px"
  fluidWidth: PropTypes.bool.isRequired,

  // segments to show in the speedometer
  segments: PropTypes.number.isRequired,
  // maximum number of labels to be shown
  maxSegmentLabels: PropTypes.number,
  // custom segment points to create unequal segments
  customSegmentStops: PropTypes.array,
  // custom segment labels that places label within the segment
  customSegmentLabels: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      position: PropTypes.oneOf(['OUTSIDE', 'INSIDE']),
      fontSize: PropTypes.string,
      color: PropTypes.string,
    })
  ),

  // color strings
  needleColor: PropTypes.string.isRequired,
  startColor: PropTypes.string.isRequired,
  endColor: PropTypes.string.isRequired,
  // custom segment colors
  segmentColors: PropTypes.array.isRequired,

  // needle transition type and duration
  needleTransition: PropTypes.string.isRequired,
  needleTransitionDuration: PropTypes.number.isRequired,
  needleHeightRatio: PropTypes.number.isRequired,

  ringWidth: PropTypes.number.isRequired,
  textColor: PropTypes.string.isRequired,

  // d3 format identifier is generally a string; default "" (empty string)
  valueFormat: PropTypes.string.isRequired,
  // segment value formatter; default: value => value
  segmentValueFormatter: PropTypes.func,
  // value text format
  currentValueText: PropTypes.string.isRequired,
  // placeholder style for current value
  currentValuePlaceholderStyle: PropTypes.string.isRequired,

  // font sizes
  labelFontSize: PropTypes.string.isRequired,
  valueTextFontSize: PropTypes.string.isRequired,
  valueTextFontWeight: PropTypes.string.isRequired,
  valueTextBelowPos: PropTypes.number.isRequired,

  // accessiblity props
  svgAriaLabel: PropTypes.string,
}

// define the default proptypes
ReactSpeedometer.defaultProps = DEFAULT_PROPS

export default ReactSpeedometer

// enums
export { CustomSegmentLabelPosition, Transition }
