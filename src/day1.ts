import { getInput, splitLines } from "./utils"

export async function day1() {
  const input = splitLines(await getInput(1))
  return { part1: part1(input), part2: part2(input) }
}

export function part1(input: string[]): number {
  return input.reduce((acc, line) => acc + lineScore(line), 0)
}

function lineScore(line: string): number {
  return buildResult(line.matchAll(/(?=(\d))/g))
}

export function part2(input: string[]): number {
  return input.reduce((acc, line) => acc + alphanumericLineScore(line), 0)
}

function alphanumericLineScore(line: string): number {
  return buildResult(
    line.matchAll(/(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g)
  )
}

function buildResult(rawMatches: IterableIterator<RegExpMatchArray>): number {
  const matches = [...rawMatches].map((match) => match[1])
  const firstDigit = NUMBER_CHART[matches[0]]
  const lastDigit = NUMBER_CHART[matches.slice(-1)[0]]

  return parseInt(`${firstDigit}${lastDigit}`, 10)
}

const NUMBER_CHART = {
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "6": "6",
  "7": "7",
  "8": "8",
  "9": "9",
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
}
