import { getInput, splitLines } from "./utils"
import { DayPromise } from "./types"

type Schematic = string[]
type Gear = number[]

export async function day3(): DayPromise {
  const input = await getInput(3)
  const schematic = parseInput(input)
  return { part1: part1(schematic), part2: part2(schematic) }
}

export function part1(schematic: Schematic): number {
  const partNumbers = schematic.flatMap((row, index) =>
    findPartNumbers({ schematic, index })
  )

  return partNumbers.reduce((acc, partNumber) => acc + partNumber, 0)
}

export function part2(schematic: Schematic): number {
  const gears = schematic.flatMap((row, index) =>
    findGears({ schematic, index })
  )
  return gears.reduce(
    (acc, gear) => acc + gear.reduce((acc, partNumber) => acc * partNumber, 1),
    0
  )
}

const SYMBOL_REGEX = /[^\w\n\.]/

function findPartNumbers({
  index,
  schematic,
}: {
  index: number
  schematic: Schematic
}): number[] {
  const prevRow = schematic[index - 1]
  const row = schematic[index]
  const nextRow = schematic[index + 1]

  const potentialPartNumberMatches = row.matchAll(/(\d*)/g)
  const potentialPartNumbers = [...potentialPartNumberMatches]
    .map((match) => {
      if (match[1] === "") return null
      return {
        number: parseInt(match[1], 10),
        length: match[1].length,
        index: match.index,
      }
    })
    .filter((match) => match)
  return potentialPartNumbers
    .filter(({ index, length }) => {
      return (
        hasSymbolInRange({ row: prevRow, index, length }) ||
        hasSymbolInRange({ row, index, length }) ||
        hasSymbolInRange({ row: nextRow, index, length })
      )
    })
    .map(({ number }) => number)
}

function hasSymbolInRange({ row, index, length }) {
  return (
    row &&
    !!row.slice(Math.max(0, index - 1), index + length + 1).match(SYMBOL_REGEX)
  )
}

function findGears({
  schematic,
  index,
}: {
  schematic: Schematic
  index: number
}): Gear[] {
  const row = schematic[index]
  const potentialGearMatches = [...row.matchAll(/\*/g)]
  const potentialGearIndices = potentialGearMatches.map((match) => match.index)
  const gears = potentialGearIndices
    .map((i) =>
      findNeighboringPartNumbers({ schematic, rowIndex: index, index: i })
    )
    .filter((gear) => gear.length === 2)
  return gears
}

function findNeighboringPartNumbers({
  schematic,
  rowIndex,
  index,
}: {
  schematic: Schematic
  rowIndex: number
  index: number
}): number[] {
  const prevRow = schematic[rowIndex - 1]
  const row = schematic[rowIndex]
  const nextRow = schematic[rowIndex + 1]
  return [
    ...partNumbersNextToGear({ row: prevRow, index }),
    ...partNumbersNextToGear({ row, index }),
    ...partNumbersNextToGear({ row: nextRow, index }),
  ]
}

function partNumbersNextToGear({
  row,
  index,
}: {
  row: string
  index: number
}): number[] {
  const potentialPartNumberMatches = [...row.matchAll(/(\d*)/g)]
    .filter((match) => match[1] !== "")
    .map((match) => ({
      number: parseInt(match[1], 10),
      index: match.index,
      length: match[1].length,
    }))
  return potentialPartNumberMatches
    .filter(
      (match) => match.index <= index + 1 && match.index + match.length >= index
    )
    .map(({ number }) => number)
}

export function parseInput(string: string): Schematic {
  return splitLines(string)
}
