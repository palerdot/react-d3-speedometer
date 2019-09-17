import { calculateSegmentStops } from "./index"

describe("calculate segment data", () => {
  const tickData = [0.33, 0.33, 0.33]
  const min = 0
  const max = 1000

  test("for empty segment stops", () => {
    expect(
      calculateSegmentStops({
        tickData,
        customSegmentStops: [],
        min,
        max,
      })
    ).toEqual(tickData)
  })
  test("for invalid segment stops", () => {
    expect(
      calculateSegmentStops({
        tickData,
        customSegmentStops: {},
        min,
        max,
      })
    ).toEqual(tickData)
  })

  // test for error if min does not match
  test("throw error for invalid min value as first", () => {
    expect(() =>
      calculateSegmentStops({
        tickData,
        customSegmentStops: [0, 50, 1000],
        min: 10,
        max,
      })
    ).toThrowError(/min/)
  })

  // test for error if max does not match
  test("throw error for invalid max value as last", () => {
    expect(() =>
      calculateSegmentStops({
        tickData,
        customSegmentStops: [0, 50, 1000],
        min: 0,
        max: 100,
      })
    ).toThrowError(/max/)
  })

  // test correctly massaged data
  test("throw error for invalid max value as last", () => {
    expect(
      calculateSegmentStops({
        tickData,
        customSegmentStops: [0, 500, 750, 1000],
        min,
        max,
      })
    ).toEqual([0.5, 0.25, 0.25])
  })

  // test massaged data for custom min/max values
  test("confirm massaged data for custom min/max values", () => {
    expect(
      calculateSegmentStops({
        tickData,
        customSegmentStops: [500, 777, 1000],
        min: 500,
        max: 1000,
      })
    ).toEqual([0.554, 0.446])

    // test for negative values
    expect(
      calculateSegmentStops({
        tickData,
        customSegmentStops: [-120, -100, 0],
        min: -120,
        max: 0,
      })
    ).toEqual([0.16666666666666666, 0.8333333333333334])
  })
})
