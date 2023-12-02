import { day1, part1, part2 } from "../day1"

const BASIC_INPUT = ["1abc2", "pqr3stu8vwx", "a1b2c3d4e5f", "treb7uchet"]

describe("Day 1", () => {
  describe("FINAL", () => {
    it("returns the correct answers", async () => {
      const { part1, part2 } = await day1()
      expect(part1).toEqual(53651)
      expect(part2).toEqual(53894)
    })
  })

  describe("Part 1", () => {
    it("returns the test case correctly", () => {
      expect(part1(BASIC_INPUT)).toEqual(142)
    })

    it("returns the first line of test case as 12", () => {
      expect(part1([BASIC_INPUT[0]])).toEqual(12)
    })

    it("returns the second line of test case as 38", () => {
      expect(part1([BASIC_INPUT[1]])).toEqual(38)
    })

    it("works with 2 digits next to each other at the beginning", () => {
      const input = ["44twosevenninembfblv5"]
      expect(part1(input)).toEqual(45)
    })

    it("works with 2 digits toward the end", () => {
      const input = ["4twosevenninembfb66lv"]
      expect(part1(input)).toEqual(46)
    })
  })

  describe("Part 2", () => {
    const INPUT = [
      "two1nine",
      "eightwothree",
      "abcone2threexyz",
      "xtwone3four",
      "4nineeightseven2",
      "zoneight234",
      "7pqrstsixteen",
    ]

    it("handles the test case", () => {
      expect(part2(INPUT)).toEqual(281)
    })

    it("works for first line", () => {
      expect(part2([INPUT[0]])).toEqual(29)
    })

    it("works for oneight", () => {
      expect(part2(["oneight"])).toEqual(18)
    })
  })
})
