import { getInput, splitLines } from "./utils"

type LocationHistory = number[]

export async function day9() {
  const input = await getInput(9)
  const histories = parseInput(input)

  return {
    part1: part1(histories),
    part2: part2(histories),
  }
}

export function part1(histories: LocationHistory[]): number {
  const differenceMaps = histories.map((history) =>
    differenceMapsForHistory(history)
  )
  const nexts = differenceMaps.map((map) => nextValue(map))
  return nexts.flatMap((next) => next).reduce((acc, n) => acc + n, 0)
}

export function part2(histories: LocationHistory[]): number {
  const differenceMaps = histories.map((history) =>
    differenceMapsForHistory(history)
  )
  const nexts = differenceMaps.map((map) => prevValue(map))
  return nexts.flatMap((next) => next).reduce((acc, n) => acc + n, 0)
}

function differenceMapsForHistory(history: LocationHistory) {
  let differences = [history]

  while (
    differences.length === 0 ||
    differences.slice(-1)[0].some((diff) => diff !== 0)
  ) {
    const lastDifference = differences[differences.length - 1]
    const diff = lastDifference.reduce((acc, n, i) => {
      if (i === 0) return acc
      return [...acc, n - lastDifference[i - 1]]
    }, [])
    differences.push(diff)
  }

  return differences
}

function nextValue(map): number {
  const reversed = [...map].reverse()
  let next = 0
  for (let i = 1; i < reversed.length; i++) {
    const diffs = reversed[i]
    next = diffs[diffs.length - 1] + next
  }
  return next
}

function prevValue(map): number {
  const reversed = [...map].reverse()
  let prev = 0
  for (let i = 1; i < reversed.length; i++) {
    const diffs = reversed[i]
    prev = diffs[0] - prev
  }
  return prev
}

export function parseInput(input: string): LocationHistory[] {
  return splitLines(input).map((line) =>
    line.split(" ").map((n) => parseInt(n, 10))
  )
}
