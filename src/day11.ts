import { getInput, splitLines } from "./utils"

type Galaxy = { x: number; y: number }

export async function day11() {
  const input = await getInput(11)

  return {
    part1: distances(parseInput(input, 2)),
    part2: distances(parseInput(input, 1000000)),
  }
}

export function parseInput(input: string, multiplier: number): Galaxy[] {
  const rows = splitLines(input)
    .map((row) => row.replace(/\s/g, ""))
    .filter((n) => n !== "")
  const expandedRowIndices = rows.reduce((acc, row, i) => {
    if (!row.includes("#")) return [...acc, i]
    return acc
  }, [])
  const expandedColumnIndices = rows[0].split("").reduce((acc, char, i) => {
    if (rows.every((row) => row[i] === ".")) return [...acc, i]
    return acc
  }, [])

  const galaxies = rows.reduce((acc, row, rowIndex) => {
    const y =
      expandedRowIndices.filter((index) => index < rowIndex).length *
        Math.max(0, multiplier - 1) +
      rowIndex
    return [
      ...acc,
      ...row.split("").reduce((accu, char, columnIndex) => {
        if (char !== "#") return accu
        const x =
          expandedColumnIndices.filter((index) => index < columnIndex).length *
            Math.max(0, multiplier - 1) +
          columnIndex
        return [...accu, { x, y }]
      }, []),
    ]
  }, [])
  return galaxies
}

export function distances(galaxies: Galaxy[]): number {
  let distances = []
  for (let i = 0; i < galaxies.length; i++) {
    for (let j = 0; j < galaxies.length; j++) {
      if (i < j) {
        const distance = distanceBetweenGalaxies(galaxies[i], galaxies[j])
        distances.push(distance)
      }
    }
  }

  return distances.reduce((acc, n) => acc + n, 0)
}

function distanceBetweenGalaxies(galaxyA: Galaxy, galaxyB: Galaxy): number {
  return Math.abs(galaxyA.x - galaxyB.x) + Math.abs(galaxyA.y - galaxyB.y)
}
