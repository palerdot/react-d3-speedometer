// export validators
export function calculateNeedleHeight(height_ratio, radius) {
  if (height_ratio < 0 || height_ratio > 1) {
    throw new Error(`Invalid needleHeightRatio given - ${height_ratio}`)
  }
  return Math.round(radius * height_ratio)
}
