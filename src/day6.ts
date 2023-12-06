import { getInput } from "./utils"

type Race = { time: number; distance: number }

export async function day6() {
  const input = await getInput(6)
  return { part1: part1(input), part2: part2(input) }
}

export function part1(input: string): number {
  const races = parseInput(input)
  return races.reduce((acc, race) => acc * winningHoldTimesCount(race), 1)
}

export function part2(input): number {
  const race = parseInputKerning(input)
  return winningHoldTimesCount(race)
}

function winningHoldTimesCount(race: Race): number {
  const minHoldTimeToTie = findMinTimeToMatchRecord(race)
  const maxHoldTimeToTie = findMaxTimeToMatchRecord(race)
  const lowestWinner = Math.floor(minHoldTimeToTie + 1) // 10 => 11, 10.5 => 11, 10.0000001 => 11
  const highestWinner = Math.ceil(maxHoldTimeToTie - 1) // 11 => 10, 10.5 => 10, 10.9999999 => 10

  return highestWinner - lowestWinner + 1 // add one because we count both ends
}

// ((t)ime - x) * x >= (d)istance
// tx - x^2 > d
// 0 > x^2 - tx + d
// -> quadratic formula
// ((t - (t ** 2 - 4 * d) ** (1/2)) / 2) < x < ((t + (t ** 2 - 4 * d) ** (1/2)) / 2)
function findMinTimeToMatchRecord({ time, distance }: Race): number {
  return (time - (time ** 2 - 4 * distance) ** (1 / 2)) / 2
}

function findMaxTimeToMatchRecord({ time, distance }: Race): number {
  return (time + Math.pow(time ** 2 - 4 * distance, 1 / 2)) / 2
}

export function parseInput(input: string) {
  const match = input.match(/Time:(.*)\nDistance:(.*)\n/ms)
  const times = match[1]
    .trim()
    .split(" ")
    .filter((n) => n !== "")
    .map((n) => parseInt(n, 10))
  const distances = match[2]
    .trim()
    .split(" ")
    .filter((n) => n !== "")
    .map((n) => parseInt(n, 10))

  return times.reduce(
    (acc, time, i) => [...acc, { time, distance: distances[i] }],
    []
  )
}

export function parseInputKerning(input: string) {
  const match = input.match(/Time:(.*)\nDistance:(.*)\n/ms)
  const time = match[1].trim().replace(/\s/g, "")
  const distance = match[2].trim().replace(/\s/g, "")
  return { time: parseInt(time, 10), distance: parseInt(distance, 10) }
}
