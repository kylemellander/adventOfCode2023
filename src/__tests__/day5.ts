import { day5, part1, part2, parseInput } from "../day5"

const BASIC_INPUT = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4
`

describe("Day 5", () => {
  describe("FINAL", () => {
    it("returns the correct answers", async () => {
      const { part1, part2 } = await day5()
      expect(part1).toEqual(51752125)
      expect(part2).toEqual(12634632)
    })
  })

  const EXAMPLE = parseInput(BASIC_INPUT)

  describe("Part 1", () => {
    it("returns the test case correctly", () => {
      expect(part1(EXAMPLE)).toEqual(35)
    })
  })

  describe("Part 2", () => {
    it("handles the test case", () => {
      expect(part2(EXAMPLE)).toEqual(46)
    })
  })
})
