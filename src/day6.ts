import { getInput, splitLines } from "./utils"

type Race = { time: number; distance: number }

export async function day6() {
  const input = await getInput(6)
  const foo = parseInput(input)
  return { part1: part1(foo), part2: part2(input) }
}

export function part1(races: Race[]): number {
  return races.reduce((acc, race) => acc * winningHoldTimesCount(race), 1)
}

export function part2(input): number {
  const race = parseInputKerning(input)
  return winningHoldTimesCount(race)
}

function winningHoldTimesCount(race: Race): number {
  const minHoldTimeToWin = findMinHoldTimeToWin(race)
  const maxHoldTimeToWin = findMaxHoldTimeToWin(race)
  return maxHoldTimeToWin - minHoldTimeToWin + 1
}

function findMinHoldTimeToWin(race: Race): number {
  for (let speed = 1; speed < race.time; speed++) {
    const distanceTravelled = speed * (race.time - speed)
    if (distanceTravelled > race.distance) return speed
  }
}

function findMaxHoldTimeToWin(race: Race): number {
  for (let speed = race.time - 1; speed > 0; speed--) {
    const distanceTravelled = speed * (race.time - speed)
    if (distanceTravelled > race.distance) return speed
  }
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
