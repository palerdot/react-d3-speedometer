import { scaleLinear as d3ScaleLinear } from "d3"

// export validators
export function calculateNeedleHeight(height_ratio, radius) {
  if (height_ratio < 0 || height_ratio > 1) {
    throw new Error(`Invalid needleHeightRatio given - ${height_ratio}`)
  }
  return Math.round(radius * height_ratio)
}

export function calculateSegmentLabelCount(maxSegmentLabelCount, segmentCount) {
  const max_segment_label_count = parseInt(maxSegmentLabelCount, 10)
  const segments_count = parseInt(segmentCount, 10)

  return max_segment_label_count &&
    max_segment_label_count > 0 &&
    max_segment_label_count <= segmentCount
    ? max_segment_label_count
    : segmentCount
}

// calculate d3 scale
export function calculateScale({ min, max, segments }) {
  return d3ScaleLinear()
    .range([0, 1])
    .domain([min, max])
    .nice(segments)
}

// calculate ticks
export function calculateTicks(scale, { min, max, segments }) {
  let ticks = []
  ticks = scale.ticks(segments)

  // [d3-scale][issue]: https://github.com/d3/d3-scale/issues/149
  if (ticks.length === 1) {
    // we have this specific `d3 ticks` behaviour stepping in a specific way
    ticks = [min, max]
  }

  return ticks
}
