import { getInput, splitLines } from "./utils"

type RoadMap = { pattern: (0 | 1)[]; roads: Record<string, [string, string]> }

export async function day8() {
  const input = await getInput(8)
  const foo = parseInput(input)
  return { part1: part1(foo), part2: part2(foo) }
}

export function parseInput(input: string) {
  const lines = splitLines(input)
  const pattern = lines[0].split("").map((char) => (char === "R" ? 1 : 0))
  const roads = lines.slice(2).reduce((acc, line) => {
    const match = line.match(/(...)\s\=\s\((...),\s(...)/)
    return { ...acc, [match[1]]: [match[2], match[3]] }
  }, {})
  return { pattern, roads }
}

export function part1(roadMap: RoadMap): number {
  return stepsToZZZ(roadMap)
}

export function part2(roadMap: RoadMap): number {
  return lowestCommonDenominator(roadMap)
}

function stepsToZZZ({ pattern, roads }: RoadMap): number {
  let steps = 0
  let location = "AAA"
  const patternLength = pattern.length
  for (steps; location !== "ZZZ"; steps++) {
    const index = pattern[steps % patternLength]
    location = roads[location][index]
  }

  return steps
}

function stepsToZ(
  { pattern, roads }: RoadMap,
  location: string,
  steps: number = 0
): { steps: number; end: string } {
  const originalSteps = steps
  const patternLength = pattern.length
  for (steps; location[2] !== "Z" || originalSteps === steps; steps++) {
    const index = pattern[steps % patternLength]
    location = roads[location][index]
  }

  return { steps, end: location }
}

function lowestCommonDenominator(roadMap: RoadMap) {
  const startingLocations = Object.keys(roadMap.roads).filter(
    (location) => location[2] === "A"
  )

  const paths = startingLocations.map((location) => stepsToZ(roadMap, location))
  const zpaths = paths.map(({ end }) => stepsToZ(roadMap, end))
  const truncatedPaths = paths.map(
    (path) => path.steps / roadMap.pattern.length
  )
  const truncatedZpaths = zpaths.map(
    (path) => path.steps / roadMap.pattern.length
  )

  if (truncatedPaths.some((path, i) => path !== truncatedZpaths[i]))
    throw "This input is borked because the puzzle has some assumptions"
  if (truncatedPaths.some((path) => primeFactors(path).length !== 1))
    throw "only prime number of times allowed through the paths"

  return truncatedPaths.reduce((acc, path) => acc * path, 1)
}

function primeFactors(n) {
  const factors = []
  let divisor = 2

  while (n >= 2) {
    if (n % divisor == 0) {
      factors.push(divisor)
      n = n / divisor
    } else {
      divisor++
    }
  }
  return factors
}
