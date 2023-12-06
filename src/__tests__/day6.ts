import { day6, part1, part2, parseInput, parseInputKerning } from "../day6"

const BASIC_INPUT = `Time:      7  15   30
Distance:  9  40  200
`

describe("Day 6", () => {
  describe("FINAL", () => {
    it("returns the correct answers", async () => {
      const { part1, part2 } = await day6()
      expect(part1).toEqual(781200)
      expect(part2).toEqual(49240091)
    })
  })

  describe("Part 1", () => {
    it("returns the test case correctly", () => {
      expect(part1(BASIC_INPUT)).toEqual(288)
    })
  })

  describe("Part 2", () => {
    it("handles the test case", () => {
      expect(part2(BASIC_INPUT)).toEqual(71503)
    })
  })
})
