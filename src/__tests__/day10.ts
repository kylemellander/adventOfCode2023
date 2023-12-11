import { day10, part1, part2, parseInput } from "../day10"

const BASIC_INPUT = `
.....
.S-7.
.|.|.
.L-J.
.....
`

const BASIC_INPUT3 = `
..F7.
.FJ|.
SJ.L7
|F--J
LJ...
`

const BASIC_INPUT4 = `
7-F7-
.FJ|7
SJLL7
|F--J
LJ.LJ
`

describe("Day 10", () => {
  describe("FINAL", () => {
    it("returns the correct answers", async () => {
      const { part1, part2 } = await day10()
      expect(part1).toEqual(6733)
      expect(part2).toEqual(435)
    })
  })

  const EXAMPLE = parseInput(BASIC_INPUT)
  const EXAMPLE2 = parseInput(BASIC_INPUT3)
  const EXAMPLE3 = parseInput(BASIC_INPUT4)

  describe("Part 1", () => {
    it("returns the test case correctly", () => {
      expect(part1(EXAMPLE)).toEqual(4)
    })

    it("returns the test case correctly", () => {
      expect(part1(EXAMPLE2)).toEqual(8)
    })

    it("returns the test case correctly", () => {
      expect(part1(EXAMPLE3)).toEqual(8)
    })
  })

  describe("Part 2", () => {
    it("handles the test case", () => {
      const input = `
      S-7
      |.|
      L-J
      `
      expect(part2(parseInput(input))).toEqual(1)
    })

    it("handles a slightly bigger example", () => {
      const input = `
      S--7
      |..|
      L--J
      `
      expect(part2(parseInput(input))).toEqual(2)
    })

    it("handles a slightly bigger example", () => {
      const input = `
      S--7
      |..|
      L--J
      ....
      `
      expect(part2(parseInput(input))).toEqual(2)
    })

    it("handles a tight but closed opening", () => {
      const input = `
      F--7
      |..|
      S-7|
      ..LJ
      `
      expect(part2(parseInput(input))).toEqual(2)
    })

    it("handles a tight but open opening", () => {
      const input = `
      F---7
      |F-7|
      ||.||
      |LS||
      L-JLJ
      `
      expect(part2(parseInput(input))).toEqual(0)
    })

    it("handles a tight but open opening", () => {
      const input = `
      F---7
      |F-7|
      |S.LJ
      |L7..
      L-J..
      `
      expect(part2(parseInput(input))).toEqual(0)
    })

    it("handles a test scenario", () => {
      const input = `
      ...........
      .S-------7.
      .|F-----7|.
      .||.....||.
      .||.....||.
      .|L-7.F-J|.
      .|..|.|..|.
      .L--J.L--J.
      ...........
      `
      expect(part2(parseInput(input))).toEqual(4)
    })

    it("handles a test scenario", () => {
      const input = `
      .F----7F7F7F7F-7....
      .|F--7||||||||FJ....
      .||.FJ||||||||L7....
      FJL7L7LJLJ||LJ.L-7..
      L--J.L7...LJS7F-7L7.
      ....F-J..F7FJ|L7L7L7
      ....L7.F7||L7|.L7L7|
      .....|FJLJ|FJ|F7|.LJ
      ....FJL-7.||.||||...
      ....L---J.LJ.LJLJ...
      `
      expect(part2(parseInput(input))).toEqual(8)
    })

    it("handles a test scenario", () => {
      const input = `
      FF7FSF7F7F7F7F7F---7
      L|LJ||||||||||||F--J
      FL-7LJLJ||||||LJL-77
      F--JF--7||LJLJ7F7FJ-
      L---JF-JLJ.||-FJLJJ7
      |F|F-JF---7F7-L7L|7|
      |FFJF7L7F-JF7|JL---7
      7-L-JL7||F7|L7F-7F7|
      L.L7LFJ|||||FJL7||LJ
      L7JLJL-JLJLJL--JLJ.L
      `
      expect(part2(parseInput(input))).toEqual(10)
    })

    it("handles the test case", () => {
      expect(part2(EXAMPLE)).toEqual(1)
    })

    it("handles the test case", () => {
      expect(part2(EXAMPLE2)).toEqual(1)
    })

    it("handles the test case", () => {
      expect(part2(EXAMPLE3)).toEqual(1)
    })
  })
})
