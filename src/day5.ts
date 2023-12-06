import { getInput } from "./utils"

type SeedMapRule = { start: number; end: number; adjust: number }
type SeedMap = SeedMapRule[]
type SeedWorldMap = { seeds: number[]; maps: SeedMap[] }

export async function day5() {
  const input = await getInput(5)
  const worldMap = parseInput(input)
  return { part1: part1(worldMap), part2: part2(worldMap) }
}

export function part1(worldMap: SeedWorldMap) {
  const remappedValues = worldMap.maps.reduce((acc, map) => {
    return applyMapToMany(acc, map)
  }, worldMap.seeds)
  return Math.min(...remappedValues)
}

export function part2(worldMap): number {
  const ranges = seedRanges(worldMap.seeds)

  let i = optimizedGroupingStart(worldMap, ranges)
  while (true) {
    const seed = mapBackToSeed(i, worldMap.maps)
    if (ranges.some(([start, end]) => seed >= start && seed < end)) {
      return i
    }
    i += 1
  }
}

function mapBackToSeed(location: number, maps: SeedMap[]): number {
  const reversedMaps = [...maps].reverse()

  return reversedMaps.reduce((acc, map) => {
    for (let i = 0; i < map.length; i++) {
      const { start, end, adjust } = map[i]
      const source = acc - adjust
      if (source >= start && source < end) return source
    }
    return acc
  }, location)
}

function applyMapToMany(seeds: number[], seedMap: SeedMap) {
  return seeds.map((seed) => applyMap(seed, seedMap))
}

export function applyMap(seed: number, seedMap: SeedMap) {
  for (let i = 0; i < seedMap.length; i++) {
    const { start, end, adjust } = seedMap[i]
    if (seed >= start && seed < end) return seed + adjust
  }
  return seed
}

function seedRanges(seeds: number[]) {
  const ranges = []
  for (let i = 0; i < seeds.length / 2; i++) {
    const [start, length] = seeds.slice(i * 2, i * 2 + 2)
    ranges.push([start, start + length])
  }
  return ranges
}

function optimizedGroupingStart(
  worldMap: SeedWorldMap,
  ranges: number[][]
): number {
  const lengths = worldMap.seeds.filter((a, i) => i % 2 === 1)
  const rangeAverage = Math.ceil(
    lengths.reduce((acc, l) => acc + l, 0) / lengths.length
  )
  const optimizedGroupings = Math.ceil(Math.pow(rangeAverage, 1 / 2.5))
  let i = 0
  while (true) {
    const seed = mapBackToSeed(i, worldMap.maps)
    if (ranges.some(([start, end]) => seed >= start && seed < end)) {
      return Math.max(0, i - optimizedGroupings)
    } else {
      i += optimizedGroupings
    }
  }
}

export function parseInput(input: string): SeedWorldMap {
  const matches = input.match(
    /seeds\:(.*)seed-to-soil\smap\:(.*)soil-to-fertilizer\smap:(.*)fertilizer-to-water\smap:(.*)water-to-light\smap:(.*)light-to-temperature\smap:(.*)temperature-to-humidity\smap:(.*)humidity-to-location\smap:(.*)/ms
  )

  return {
    seeds: splitAndInt(matches[1]),
    maps: matches.slice(2).map((match) => intoGroups(match)),
  }
}

function intoGroups(string): SeedMap {
  return string
    .trim()
    .split("\n")
    .map((line) => {
      const [destStart, sourceStart, range] = line
        .split(" ")
        .map((n) => parseInt(n, 10))
      return {
        start: sourceStart,
        end: sourceStart + range,
        adjust: destStart - sourceStart,
      }
    })
}

function splitAndInt(string: string): number[] {
  return string
    .trim()
    .split(" ")
    .map((n) => parseInt(n, 10))
}
