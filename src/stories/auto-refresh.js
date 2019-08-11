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
            maxSegmentLabels={1}
            textColor={"#d8dee9"}
            needleColor={`rgba(94, 129, 172, ${this.state.opacity})`}
            forceRender={true}
          />
        </div>

        {/* <div
          style={{
            margin: "7px 17px",
          }}
        >
          <ReactSpeedometer
            forceRender={true}
            textColor={"#d8dee9"}
            maxSegmentLabels={0}
            customSegmentStops={
              this.state.opacity === 1 ? [0, 777, 1000] : [0, 500, 1000]
            }
            segmentColors={["#5959ac", "#DEDEDE"]}
            needleColor={"#5959ac"}
            currentValueText={"Current Value: ${value}"}
            value={this.state.opacity === 1 ? 777 : 500}
          />
        </div>
         */}

        <div
          style={{
            margin: "7px 17px",
          }}
        >
          <ReactSpeedometer
            maxSegmentLabels={1}
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
            needleColor="#eceff4"
            needleTransition="easeElastic"
            needleTransitionDuration={3333}
            customSegmentStops={[0, 500, 700, 800, 900, 1000]}
            value={this.state.opacity === 1 ? 333 : 470}
          />
        </div>
      </div>
    )
  }
}

export default AutoRefresh
