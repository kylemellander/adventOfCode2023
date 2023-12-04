import { day4, part1, part2, parseInput } from "../day4"

const BASIC_INPUT = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
`

describe("Day 4", () => {
  describe("FINAL", () => {
    it("returns the correct answers", async () => {
      const { part1, part2 } = await day4()
      expect(part1).toEqual(26914)
      expect(part2).toEqual(13080971)
    })
  })

  const EXAMPLE = parseInput(BASIC_INPUT)

  describe("Part 1", () => {
    it("returns the test case correctly", () => {
      expect(part1(EXAMPLE)).toEqual(13)
    })

    it("returns the first test card as 8 points", () => {
      expect(
        part1(parseInput("Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53"))
      ).toEqual(8)
    })
  })

  describe("Part 2", () => {
    it("handles the test case", () => {
      expect(part2(EXAMPLE)).toEqual(30)
    })

    it("returns 1 for the first card", () => {
      expect(
        part2(parseInput("Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53"))
      ).toEqual(1)
    })

    it("returns 3 for the first 2 cards", () => {
      expect(
        part2(
          parseInput(`Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
`)
        )
      ).toEqual(3)
    })

    it("returns 7 for the first 3 cards", () => {
      expect(
        part2(
          parseInput(`Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
`)
        )
      ).toEqual(7)
    })

    it("returns 15 for the first 4 cards", () => {
      expect(
        part2(
          parseInput(`Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
`)
        )
      ).toEqual(15)
    })

    it("returns 29 for the first 5 cards", () => {
      expect(
        part2(
          parseInput(`Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
`)
        )
      ).toEqual(29)
    })
  })
})
