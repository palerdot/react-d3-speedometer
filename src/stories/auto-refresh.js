// sample auto refresh component to screen grab gifs
import React from "react"
import ReactSpeedometer from "../../src/"
import { rgb } from "polished"

class AutoRefresh extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      opacity: 1,
    }
  }
  componentDidMount = () => {
    setInterval(() => {
      this.setState((prevState) => ({
        opacity: prevState.opacity === 1 ? 0.9 : 1,
      }))
    }, 5000)
  }

  render() {
    return (
      <div
        style={{
          background: "#2e3440",
          display: "flex",
          justifyContent: "center",
          // alignItems: "center",
          padding: "31px",
        }}
      >
        <div
          style={{
            margin: "7px 17px",
          }}
        >
          <ReactSpeedometer
            value={333}
            segments={1000}
            maxSegmentLabels={5}
            textColor={"#d8dee9"}
            needleColor={`rgba(94, 129, 172, ${this.state.opacity})`}
            forceRender={true}
          />
        </div>

        <div
          style={{
            margin: "7px 17px",
          }}
        >
          <ReactSpeedometer
            maxSegmentLabels={12}
            segments={3}
            value={470}
            forceRender={true}
            textColor={"#d8dee9"}
            segmentColors={["#FF9933", "#FFF", "#138808"]}
            needleColor="#5959ac"
            needleTransition="easeElastic"
            needleTransitionDuration={3333}
            currentValueText={"Current Value: ${value}"}
          />
        </div>
        <div
          style={{
            margin: "7px 17px",
          }}
        >
          <ReactSpeedometer
            segments={5}
            segmentColors={[
              "#bf616a",
              "#d08770",
              "#ebcb8b",
              "#a3be8c",
              "#b48ead",
            ]}
            maxSegmentLabels={5}
            textColor={"#d8dee9"}
            // needleColor={`rgba(94, 129, 172, ${this.state.opacity})`}
            needleColor="#eceff4"
            // forceRender={true}
            // value={333}
            value={this.state.opacity === 1 ? 333 : 470}
          />
        </div>
      </div>
    )
  }
}

export default AutoRefresh
