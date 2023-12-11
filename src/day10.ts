import { getInput, splitLines } from "./utils"

type Node = { type: string; x: number; y: number }
type GroundNode = Node & { type: "ground" }
type PathNode = Node & {
  type: "path"
  distance?: number
  upBlocked: boolean
  leftBlocked: boolean
  rightBlocked: boolean
  downBlocked: boolean
  directions: string[]
  insideEdge?: "D" | "DL" | "DR" | "L" | "R" | "U" | "UL" | "UR"
}
type LocationNode = GroundNode | PathNode
type AnimalMap = Record<string, LocationNode>

export async function day10() {
  const input = await getInput(10)
  const animalMap = parseInput(input)

  return { part1: part1(animalMap), part2: part2(animalMap) }
}

export function part1(animalMap: AnimalMap): number {
  const highestRoute = Object.values(animalMap).reduce(
    (acc, node) =>
      node.type === "path" && node.distance && node.distance > acc
        ? node.distance
        : acc,
    0
  )

  return (highestRoute + 1) / 2
}

export function part2(animalMap: AnimalMap): number {
  const maxX = Object.values(animalMap).reduce(
    (acc, node) => Math.max(acc, node.x),
    0
  )
  const maxY = Object.values(animalMap).reduce(
    (acc, node) => Math.max(acc, node.y),
    0
  )

  let enclosed = []

  for (let y = 0; y <= maxY; y++) {
    let inside = false
    let inLine = false
    let inLineDir: "up" | "down"
    for (let x = 0; x <= maxX; x++) {
      const node = animalMap[`${x},${y}`]
      if (node.type === "ground" || node.distance === undefined) {
        if (inside) enclosed.push(`${x},${y}`)
        continue
      }
      if (inLine) {
        if (node.rightBlocked) {
          if (!node[`${inLineDir}Blocked`]) inside = !inside
          inLine = false
        }
        continue
      }

      if (node.leftBlocked && node.rightBlocked) {
        inside = !inside
        continue
      }

      if (node.leftBlocked && !node.rightBlocked) {
        inLine = true
        inLineDir = node.upBlocked ? "up" : "down"
        continue
      }
    }
  }

  return enclosed.length
}

function defineLionLoop(animalMap: AnimalMap): AnimalMap {
  const {
    x: startX,
    y: startY,
    directions,
  } = Object.values(animalMap).find(
    (node) => node.type === "path" && node.distance === 0
  ) as PathNode
  const startKey = `${startX},${startY}`
  let previousKey = startKey
  let nodeKey = directions.find((key) => {
    const node = animalMap[key]
    return node && node.type === "path" && node.directions.includes(startKey)
  })
  let animalMapWithLionLoop = { ...animalMap }
  let distance = 1
  while (nodeKey !== startKey) {
    if (!nodeKey) throw "Whoops!"

    const node = animalMapWithLionLoop[nodeKey] as PathNode
    animalMapWithLionLoop[nodeKey] = {
      ...node,
      distance,
    }
    const newNodeKey = node.directions.find((key) => key !== previousKey)
    previousKey = nodeKey
    nodeKey = newNodeKey
    distance += 1
  }

  return animalMapWithLionLoop
}

export function parseInput(input: string): AnimalMap {
  const rows = splitLines(input)
    .map((row) => row.replace(/\s/g, ""))
    .filter((n) => n !== "")
  const result: AnimalMap = rows.reduce((acc, row, y) => {
    return {
      ...acc,
      ...row.split("").reduce((accu, char, x) => {
        if (char === ".")
          return { ...accu, [`${x},${y}`]: { type: "ground", x, y } }
        if (char === "S")
          return { ...accu, [`${x},${y}`]: buildStartNode(x, y, rows) }
        const node: PathNode = {
          type: "path",
          distance: char === "S" ? 0 : undefined,
          x,
          y,
          upBlocked: ["F", "-", "7"].includes(char),
          leftBlocked: ["F", "|", "L"].includes(char),
          rightBlocked: ["7", "|", "J"].includes(char),
          downBlocked: ["L", "-", "J"].includes(char),
          directions: findDirections(char).map(
            ([offsetX, offsetY]) => `${x + offsetX},${y + offsetY}`
          ),
        }
        return {
          ...accu,
          [`${x},${y}`]: node,
        }
      }, {}),
    }
  }, {})
  return defineLionLoop(result)
}

function buildStartNode(x: number, y: number, rows: string[]): PathNode {
  const up = rows[y - 1] && rows[y - 1][x]
  const left = rows[y][x - 1]
  const right = rows[y][x + 1]
  const down = rows[y + 1] && rows[y + 1][x]
  const upBlocked = !up || [".", "L", "-", "J"].includes(up)
  const leftBlocked = !left || [".", "7", "|", "J"].includes(left)
  const rightBlocked = !right || [".", "L", "|", "F"].includes(right)
  const downBlocked = !down || [".", "F", "-", "7"].includes(down)
  return {
    type: "path",
    distance: 0,
    x,
    y,
    upBlocked,
    leftBlocked,
    rightBlocked,
    downBlocked,
    directions: [
      !upBlocked && `${x},${y - 1}`,
      !leftBlocked && `${x - 1},${y}`,
      !rightBlocked && `${x + 1},${y}`,
      !downBlocked && `${x},${y + 1}`,
    ].filter((n) => n),
  }
}

const UP = [0, -1]
const LEFT = [-1, 0]
const RIGHT = [1, 0]
const DOWN = [0, 1]

function findDirections(char: string): number[][] {
  if (char === "-") return [LEFT, RIGHT]
  if (char === "|") return [UP, DOWN]
  if (char === "L") return [UP, RIGHT]
  if (char === "J") return [UP, LEFT]
  if (char === "7") return [LEFT, DOWN]
  if (char === "F") return [RIGHT, DOWN]
}
