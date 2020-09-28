// sample auto refresh component to screen grab gifs
import React from "react"
import ReactSpeedometer from "../../src/"

class AutoRefresh extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      opacity: 1,
    }
  }
  componentDidMount = () => {
    setInterval(() => {
      this.setState(prevState => ({
        opacity: prevState.opacity === 1 ? 0.9 : 1,
      }))
    }, 3333)
  }

  render() {
    return (
      <div
        style={{
          background: "#2e3440",
          background: "#2a2744",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            // alignItems: "center",
            height: "231px",
          }}
        >
          <div
            style={{
              margin: "7px 17px",
            }}
          >
            <ReactSpeedometer
              maxSegmentLabels={1}
              segments={3}
              value={471}
              forceRender={true}
              textColor={"#d8dee9"}
              segmentColors={["#FF9933", "#FFF", "#138808"]}
              needleColor={`rgba(94, 129, 172, ${this.state.opacity})`}
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
              value={333}
              segments={77}
              maxSegmentLabels={1}
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            // alignItems: "center",
          }}
        >
          <div>
            <ReactSpeedometer
              width={500}
              needleHeightRatio={0.7}
              value={this.state.opacity === 1 ? 777 : 931}
              currentValueText="Happiness Level"
              startColor={"#ff927e"}
              customSegmentLabels={[
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
              ]}
              ringWidth={47}
              needleTransitionDuration={3333}
              needleTransition="easeElastic"
              needleColor={"#90f2ff"}
              textColor={"#d8dee9"}
            />
          </div>
          <div>
            <ReactSpeedometer
              width={500}
              needleHeightRatio={0.7}
              value={this.state.opacity === 1 ? 747 : 871}
              customSegmentStops={[0, 250, 750, 1000]}
              segmentColors={["#9399ff", "#14ffec", "#00bbf0"]}
              currentValueText="How are you?"
              customSegmentLabels={[
                {
                  text: "Good",
                  position: "OUTSIDE",
                  color: "#d8dee9",
                },
                {
                  text: "Great",
                  position: "OUTSIDE",
                  color: "#d8dee9",
                },
                {
                  text: "Awesome!",
                  position: "OUTSIDE",
                  color: "#d8dee9",
                },
              ]}
              ringWidth={47}
              needleTransitionDuration={3333}
              needleTransition="easeElastic"
              needleColor={"#a7ff83"}
              textColor={"#d8dee9"}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default AutoRefresh
