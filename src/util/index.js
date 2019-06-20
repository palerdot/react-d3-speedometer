import { isNumber as _isNumber } from "lodash"
import { scaleLinear as d3ScaleLinear } from "d3"

// export validators
export function calculateNeedleHeight({ heightRatio, radius }) {
  if (heightRatio < 0 || heightRatio > 1) {
    throw new Error(`Invalid needleHeightRatio given - ${heightRatio}`)
  }
  return Math.round(radius * heightRatio)
}

export function calculateSegmentLabelCount({
  maxSegmentLabelCount,
  segmentCount,
}) {
  const max_segment_label_count = parseInt(maxSegmentLabelCount, 10)
  const segments_count = parseInt(segmentCount, 10)

  return _isNumber(max_segment_label_count) &&
    max_segment_label_count >= 0 &&
    max_segment_label_count <= segments_count
    ? max_segment_label_count
    : segments_count
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
