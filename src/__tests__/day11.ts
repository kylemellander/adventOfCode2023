import { day11, distances, parseInput } from "../day11"

const BASIC_INPUT = `
...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....
`

describe("Day 11", () => {
  describe("FINAL", () => {
    it("returns the correct answers", async () => {
      const { part1, part2 } = await day11()
      expect(part1).toEqual(9522407)
      expect(part2).toEqual(544723432977)
    })
  })

  describe("Part 1", () => {
    const EXAMPLE = parseInput(BASIC_INPUT, 2)

    it("returns the test case correctly", () => {
      expect(distances(EXAMPLE)).toEqual(374)
    })
  })

  describe("Part 2", () => {
    const EXAMPLE = parseInput(BASIC_INPUT, 100)

    it("handles the test case", () => {
      expect(distances(EXAMPLE)).toEqual(8410)
    })
  })
})
