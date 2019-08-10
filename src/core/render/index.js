import { pipe } from "lodash/fp"
import {
  select as d3Select,
  line as d3Line,
  curveMonotoneX as d3CurveMonotoneX,
} from "d3"
import {
  centerTranslation,
  getRadius,
  calculateNeedleHeight,
  formatCurrentValueText,
} from "../util"
import { getNeedleTransition } from "../util/get-needle-transition"
import {
  configureArc,
  configureTicks,
  configureTickData,
  configureScale,
} from "../config/configure"

export const update = ({ d3_refs, newValue, config }) => {
  const scale = configureScale(config)
  const ratio = scale(newValue)
  const range = config.maxAngle - config.minAngle

  const newAngle = config.minAngle + ratio * range
  // update the pointer
  d3_refs.pointer
    .transition()
    .duration(config.needleTransitionDuration)
    .ease(getNeedleTransition(config.needleTransition))
    .attr("transform", `rotate(${newAngle})`)

  d3_refs.current_value_text.text(formatCurrentValueText(newValue, config))
}

export const render = ({ container, config }) => {
  const r = getRadius(config)
  const centerTx = centerTranslation(r)

  const svg = _renderSVG({ container, config })

  _renderArcs({ config, svg, centerTx })
  _renderLabels({ config, svg, centerTx, r })

  return {
    current_value_text: _renderCurrentValueText({ config, svg }),
    pointer: _renderNeedle({ config, svg, r, centerTx }),
  }
}

// helper function to render individual parts of gauge
function _renderSVG({ container, config }) {
  return d3Select(container)
    .append("svg:svg")
    .attr("class", "speedometer")
    .attr("width", config.width)
    .attr("height", config.height)
}

function _renderArcs({ config, svg, centerTx }) {
  const tickData = configureTickData(config)
  const arc = configureArc(config)

  let arcs = svg
    .append("g")
    .attr("class", "arc")
    .attr("transform", centerTx)

  arcs
    .selectAll("path")
    .data(tickData)
    .enter()
    .append("path")
    .attr("class", "speedo-segment")
    .attr("fill", (d, i) => {
      if (config.customSegmentStops.length === 0) {
        return config.arcColorFn(d * i)
      }
      return config.segmentColors && config.segmentColors[i]
        ? config.segmentColors[i]
        : config.arcColorFn(d * i)
    })
    .attr("d", arc)
}

function _renderLabels({ config, svg, centerTx, r }) {
  const ticks = configureTicks(config)
  const scale = configureScale(config)
  const range = config.maxAngle - config.minAngle

  let lg = svg
    .append("g")
    .attr("class", "label")
    .attr("transform", centerTx)

  lg.selectAll("text")
    .data(ticks)
    .enter()
    .append("text")
    .attr("transform", (d) => {
      const ratio = scale(d)
      const newAngle = config.minAngle + ratio * range
      return (
        "rotate(" + newAngle + ") translate(0," + (config.labelInset - r) + ")"
      )
    })
    .text(config.labelFormat)
    // add class for text label
    .attr("class", "segment-value")
    // styling stuffs
    .style("text-anchor", "middle")
    .style("font-size", "14px")
    .style("font-weight", "bold")
    // .style("fill", "#666");
    .style("fill", config.textColor)
}

function _renderCurrentValueText({ config, svg }) {
  return (
    svg
      .append("g")
      .attr(
        "transform",
        "translate(" + config.width / 2 + "," + config.width / 2 + ")"
      )
      .append("text")
      // add class for the text
      .attr("class", "current-value")
      .attr("text-anchor", "middle")
      // position the text 23pt below
      .attr("y", 23)
      // add text
      .text(config.currentValue || "amaidhi")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      // .style("fill", "#666");
      .style("fill", config.textColor)
  )
}

function _renderNeedle({ config, svg, r, centerTx }) {
  const needleLength = calculateNeedleHeight({
    heightRatio: config.needleHeightRatio,
    radius: r,
  })

  const lineData = [
    [config.pointerWidth / 2, 0],
    [0, -needleLength],
    [-(config.pointerWidth / 2), 0],
    [0, config.pointerTailLength],
    [config.pointerWidth / 2, 0],
  ]

  const pointerLine = d3Line().curve(d3CurveMonotoneX)

  let pg = svg
    .append("g")
    .data([lineData])
    .attr("class", "pointer")
    .attr("transform", centerTx)
    .style("fill", config.needleColor)

  return pg
    .append("path")
    .attr("d", pointerLine)
    .attr("transform", "rotate(" + config.minAngle + ")")
}
