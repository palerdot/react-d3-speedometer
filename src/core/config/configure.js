import { range as d3Range, arc as d3Arc } from "d3"
import {
  deg2rad,
  sumArrayTill,
  calculateScale,
  calculateTicks,
  calculateSegmentStops,
} from "../util"

export function configureScale(config) {
  return calculateScale({
    min: config.minValue,
    max: config.maxValue,
    segments: config.maxSegmentLabels,
  })
}

export function configureTicks(config) {
  const scale = configureScale(config)

  let ticks = calculateTicks(scale, {
    min: config.minValue,
    max: config.maxValue,
    segments: config.maxSegmentLabels,
  })

  if (config.customSegmentStops.length > 0) {
    ticks = config.customSegmentStops
  }

  return ticks
}

export function configureTickData(config) {
  const defaultTickData = d3Range(config.majorTicks).map((d) => {
    return 1 / config.majorTicks
  })

  const tickData = calculateSegmentStops({
    tickData: defaultTickData,
    customSegmentStops: config.customSegmentStops,
    min: config.minValue,
    max: config.maxValue,
  })

  return tickData
}

export const configureArc = (config) => {
  console.log("porumai! will configure tick data ", config)
  const tickData = configureTickData(config)

  const range = config.maxAngle - config.minAngle
  const r = config.width / 2

  const arc = d3Arc()
    .innerRadius(r - config.ringWidth - config.ringInset)
    .outerRadius(r - config.ringInset)
    .startAngle((d, i) => {
      // var ratio = d * i
      const ratio = sumArrayTill(tickData, i)
      return deg2rad(config.minAngle + ratio * range)
    })
    .endAngle((d, i) => {
      // var ratio = d * (i + 1)
      const ratio = sumArrayTill(tickData, i + 1)
      return deg2rad(config.minAngle + ratio * range)
    })

  return arc
}
