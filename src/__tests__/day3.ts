import { day3, part1, part2, parseInput } from "../day3"

const BASIC_INPUT = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
`

describe("Day 3", () => {
  describe("FINAL", () => {
    it("returns the correct answers", async () => {
      const { part1, part2 } = await day3()
      expect(part1).toEqual(560670)
      expect(part2).toEqual(91622824)
    })
  })

  const EXAMPLE = parseInput(BASIC_INPUT)

  describe("Part 1", () => {
    it("returns the test case correctly", () => {
      expect(part1(EXAMPLE)).toEqual(4361)
    })

    it("returns the score for the first row", () => {
      expect(part1(EXAMPLE.slice(0, 1))).toEqual(0)
    })

    it("returns the score for the first 2 rows", () => {
      expect(part1(EXAMPLE.slice(0, 2))).toEqual(467)
    })

    it("returns the score for rows 2 and 3", () => {
      expect(part1(EXAMPLE.slice(1, 3))).toEqual(35)
    })

    it("returns the score for the first 4 rows", () => {
      expect(part1(EXAMPLE.slice(0, 4))).toEqual(1135) // 467 + 35 + 633
    })
  })

  describe("Part 2", () => {
    it("handles the test case", () => {
      expect(part2(EXAMPLE)).toEqual(467835)
    })

    it("returns the score for the first row", () => {
      expect(part2(EXAMPLE.slice(0, 1))).toEqual(0)
    })

    it("returns the score for the first 3 rows", () => {
      expect(part2(EXAMPLE.slice(0, 3))).toEqual(16345)
    })
  })
})
