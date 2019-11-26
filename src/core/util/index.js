import {
  isNumber as _isNumber,
  sum as _sum,
  isEmpty,
  isArray,
  head as _head,
  last as _last,
  drop as _drop,
  times as _times,
} from "lodash"
import { take as _take } from "lodash/fp"
import { scaleLinear as d3ScaleLinear } from "d3"

// helper function to calculate array sum till specified index
export function sumArrayTill(array, index) {
  return _sum(_take(index)(array))
}

// helper function to calculate segment stops
// if custom segment stops is given does the following validation
// first elem === min
// last elem === max
// if valid, massages custom segment stops into valid tick data
// if custom segment stop is not given
export function calculateSegmentStops({
  tickData,
  customSegmentStops,
  min,
  max,
}) {
  if (!isArray(customSegmentStops) || isEmpty(customSegmentStops)) {
    // return existing tick data
    return tickData
  }
  // there is some custom segment stop
  // let us do the validation

  // first element should be equivalent to min
  if (_head(customSegmentStops) !== min) {
    throw new Error(
      `First value should be equivalent to min value given. Current min value - ${min}`
    )
  }

  // last element shuold be equivalent to max
  if (_last(customSegmentStops) !== max) {
    throw new Error(
      `Last value should be equivalent to max value given. Current min value - ${max}`
    )
  }

  // looks like we have a valid custom segment stop, let us massage the data
  // construct the relative difference values
  const relative_difference = customSegmentStops.map((current_stop, index) => {
    if (index === 0) {
      // ignore
      return
    }
    return (current_stop - customSegmentStops[index - 1]) / (max - min)
  })

  return _drop(relative_difference)
}

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
}

// calculate ticks
export function calculateTicks(scale, { min, max, segments }) {
  let ticks = []
  ticks = scale.ticks(segments)
  // [d3-scale][issue]: https://github.com/d3/d3-scale/issues/149

  const normalize_ticks =
    (_last(ticks) !== max || segments < ticks.length) && ticks.length > 1

  if (normalize_ticks) {
    // let us split it ourselves
    const diff = (max - min) / segments
    ticks = [min]
    _times(segments, (i) => {
      ticks.push(min + (i + 1) * diff)
    })
  }

  if (ticks.length === 1) {
    // we have this specific `d3 ticks` behaviour stepping in a specific way
    ticks = [min, max]
  }

  return ticks
}

// formats current value
// ref: https://stackoverflow.com/a/29771751/1410291
export function formatCurrentValueText(currentValue, config) {
  // get the current value
  const value = config.labelFormat(currentValue)
  // get the current placeholder style
  const placeholderStyle = config.currentValuePlaceholderStyle

  // replace the placeholder style in current text
  return config.currentValueText.replace(placeholderStyle, value)
}

export function deg2rad(deg) {
  return (deg * Math.PI) / 180
}

export function centerTranslation(r, paddingHorizontal, paddingVertical) {
  return `translate(${r + paddingHorizontal}, ${r + paddingVertical})`
}

export function getRadius(config) {
  return config.width / 2
}
