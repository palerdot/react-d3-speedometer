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
})
