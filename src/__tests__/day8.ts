import { day8, part1, part2, parseInput, allLocationsToZ } from "../day8"
import { getInput } from "../utils"

const BASIC_INPUT = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)
`

const BASIC_INPUT2 = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)
`

const BASIC_PART2_INPUT = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)
`

describe("Day 8", () => {
  describe("FINAL", () => {
    xit("returns the correct answers", async () => {
      const { part1, part2 } = await day8()
      expect(part1).toEqual(20513)
      expect(part2).toEqual(56922302683)
    })
  })

  const EXAMPLE = parseInput(BASIC_INPUT)
  const EXAMPLE2 = parseInput(BASIC_INPUT2)

  describe("Part 1", () => {
    it("returns the test case correctly", () => {
      expect(part1(EXAMPLE)).toEqual(2)
    })

    it("returns the test case correctly", () => {
      expect(part1(EXAMPLE2)).toEqual(6)
    })
  })

  describe("Part 2", () => {
    const EXAMPLE = parseInput(BASIC_PART2_INPUT)

    it("handles the test case", () => {
      expect(part2(EXAMPLE)).toEqual(6)
    })
  })
})
