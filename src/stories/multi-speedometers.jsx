import React from 'react'
import ReactSpeedometer from '../index'
// create multiple speedometers
export default class MultiSpeedoMeters extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      speedometer1: {
        startColor: 'red',
        toggleStatus: false,
        value: 10,
        maxValue: 200,
        segments: 1,
      },
      speedometer2: {
        startColor: 'blue',
        toggleStatus: false,
        value: 10,
        maxValue: 40,
        segments: 1,
      },
    }

    this.values = [
      {
        speedometer1: {
          startColor: 'red',
          toggleStatus: false,
          value: 10,
          maxValue: 200,
          segments: 1,
        },
        speedometer2: {
          startColor: 'blue',
          toggleStatus: false,
          value: 10,
          maxValue: 40,
          segments: 1,
        },
      },
      {
        speedometer1: {
          startColor: 'orange',
          toggleStatus: false,
          value: 5,
          maxValue: 10,
          segments: 1,
        },
        speedometer2: {
          startColor: 'green',
          toggleStatus: false,
          value: 900,
          maxValue: 1000,
          segments: 1,
        },
      },
    ]
  }

  render() {
    return (
      <div>
        <h4>
          Click the below button to force rerendering the whole component on
          props change. By default, on props change, only the speedometer
          value/needle value will be updated and animated for smooth
          visualization. Below button will toggle between two sets of totally
          different appearances, when forceRender option is given true.
        </h4>

        <button
          onClick={() => {
            // change the toggle status
            this.setState({
              toggleStatus: !this.state.toggleStatus,
            })
            // now set the new set of values
            let new_values = this.state.toggleStatus
              ? this.values[0]
              : this.values[1]
            this.setState(new_values)
          }}
        >
          <strong>Force Re render component on props change</strong>
        </button>
        <ReactSpeedometer
          value={this.state.speedometer1.value}
          maxValue={this.state.speedometer1.maxValue}
          startColor={this.state.speedometer1.startColor}
          forceRender={true}
          segments={this.state.speedometer1.segments}
          width={this.state.speedometer1.width}
          height={this.state.speedometer1.height}
        />
        <ReactSpeedometer
          value={this.state.speedometer2.value}
          maxValue={this.state.speedometer2.maxValue}
          startColor={this.state.speedometer2.startColor}
          forceRender={true}
          segments={this.state.speedometer2.segments}
          width={this.state.speedometer2.width}
          height={this.state.speedometer2.height}
        />
      </div>
    )
  }
}
