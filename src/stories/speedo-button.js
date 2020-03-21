import React from "react"
import ReactSpeedometer from "../index"
// a custom button with state to demonstrate force rendering
export default class SpeedoButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      toggleStatus: false,
      value: 111,
      startColor: "blue",
      segments: 5,
      width: 300,
      height: 300,
    }

    this.values = [
      {
        value: 111,
        startColor: "blue",
        segments: 5,
        width: 300,
        height: 300,
      },
      {
        value: 222,
        startColor: "orange",
        segments: 10,
        width: 400,
        height: 400,
      },
    ]
  }

  render() {
    return (
      <div
        style={{
          color: "#DEDEDE",
        }}
      >
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
          value={this.state.value}
          startColor={this.state.startColor}
          forceRender={true}
          segments={this.state.segments}
          width={this.state.width}
          height={this.state.height}
          textColor={"#AAA"}
        />
      </div>
    )
  }
}
