import {
  day7,
  part1,
  part2,
  parseInput,
  jokerCardRanker,
  defaultCardRanker,
} from "../day7"

const BASIC_INPUT = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
`

describe("Day 7", () => {
  describe("FINAL", () => {
    it("returns the correct answers", async () => {
      const { part1, part2 } = await day7()
      expect(part1).toEqual(251806792)
      expect(part2).toEqual(252113488)
    })
  })

  describe("Part 1", () => {
    const EXAMPLE = parseInput(BASIC_INPUT, defaultCardRanker)

    it("returns the test case correctly", () => {
      expect(part1(EXAMPLE)).toEqual(6440)
    })
  })

  describe("Part 2", () => {
    it("handles the test case", () => {
      expect(part2(parseInput(BASIC_INPUT, jokerCardRanker))).toEqual(5905)
    })
  })
})
