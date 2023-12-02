import { day2, part1, part2, parseInput } from "../day2"

const BASIC_INPUT = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
`

describe("Day 1", () => {
  describe("FINAL", () => {
    it("returns the correct answers", async () => {
      const { part1, part2 } = await day2()
      expect(part1).toEqual(2512)
      expect(part2).toEqual(67335)
    })
  })

  describe("parseInput", () => {
    it("builds rounds correctly", () => {
      expect(parseInput(BASIC_INPUT)).toEqual([
        {
          id: 1,
          rounds: [
            { blue: 3, red: 4, green: 0 },
            { blue: 6, red: 1, green: 2 },
            { blue: 0, red: 0, green: 2 },
          ],
        },
        {
          id: 2,
          rounds: [
            { blue: 1, red: 0, green: 2 },
            { blue: 4, red: 1, green: 3 },
            { blue: 1, red: 0, green: 1 },
          ],
        },
        {
          id: 3,
          rounds: [
            { blue: 6, red: 20, green: 8 },
            { blue: 5, red: 4, green: 13 },
            { blue: 0, red: 1, green: 5 },
          ],
        },
        {
          id: 4,
          rounds: [
            { blue: 6, red: 3, green: 1 },
            { blue: 0, red: 6, green: 3 },
            { blue: 15, red: 14, green: 3 },
          ],
        },
        {
          id: 5,
          rounds: [
            { blue: 1, red: 6, green: 3 },
            { blue: 2, red: 1, green: 2 },
          ],
        },
      ])
    })
  })

  const EXAMPLE_GAME = parseInput(BASIC_INPUT)

  describe("Part 1", () => {
    it("returns the test case correctly", () => {
      expect(part1(EXAMPLE_GAME)).toEqual(8)
    })

    it("returns the score for the first game", () => {
      expect(part1([EXAMPLE_GAME[0]])).toEqual(1)
    })
  })

  describe("Part 2", () => {
    it("handles the test case", () => {
      expect(part2(EXAMPLE_GAME)).toEqual(2286)
    })

    it("returns the score for the first game", () => {
      expect(part2([EXAMPLE_GAME[0]])).toEqual(48)
    })
  })
})
