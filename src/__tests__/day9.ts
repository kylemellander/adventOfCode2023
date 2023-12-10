import { day9, part1, part2, parseInput } from "../day9"

const BASIC_INPUT = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45
`

describe("Day 9", () => {
  describe("FINAL", () => {
    it("returns the correct answers", async () => {
      const { part1, part2 } = await day9()
      expect(part1).toEqual(1762065988)
      expect(part2).toEqual(1066)
    })
  })

  const EXAMPLE = parseInput(BASIC_INPUT)

  describe("Part 1", () => {
    it("returns the test case correctly", () => {
      expect(part1(EXAMPLE)).toEqual(114)
    })
  })

  describe("Part 2", () => {
    it("handles the test case", () => {
      expect(part2(EXAMPLE)).toEqual(2)
    })
  })
})
