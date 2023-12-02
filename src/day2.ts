import { getInput, splitLines } from "./utils"
import { DayPromise } from "./types"

type Round = { blue: number; red: number; green: number }
type Limit = { blue: number; red: number; green: number }
type Game = { id: number; rounds: Round[] }

export async function day2(): DayPromise {
  const input = await getInput(2)
  const games = parseInput(input)
  //   return { part1: getPart1Score(rounds), part2: getPart2Score(rounds) }
  return { part1: part1(games), part2: part2(games) }
}

const LIMITS: Limit = { blue: 14, green: 13, red: 12 }

export function part1(games: Game[]): number {
  const possibleGames = games.filter((game) => isPossibleGame(game))
  return possibleGames.reduce((acc, game) => acc + game.id, 0)
}

function isPossibleGame(game: Game): boolean {
  return game.rounds.every((round) => isPossibleRound(round))
}

function isPossibleRound(round: Round): boolean {
  return Object.keys(round).every((key) => round[key] <= LIMITS[key])
}

export function part2(games: Game[]): number {
  return games.reduce((acc, game) => acc + gamePower(game), 0)
}

function gamePower(game: Game): number {
  return (
    minRequiredForColor({ game, color: "blue" }) *
    minRequiredForColor({ game, color: "green" }) *
    minRequiredForColor({ game, color: "red" })
  )
}

function minRequiredForColor({
  game,
  color,
}: {
  game: Game
  color: keyof Round
}): number {
  return Math.max(...game.rounds.map((round) => round[color]))
}

export function parseInput(input: string): Game[] {
  return splitLines(input).map((str) => {
    const matches = str.match(/Game\s(\d*)\:\s(.*)/)
    const rounds = matches[2]
      .split("; ")
      .map((rawRound) => normalizeRound(rawRound))
    return { id: parseInt(matches[1], 10), rounds: rounds }
  })
}

function normalizeRound(rawRound: string): Round {
  const blueMatch = rawRound.match(/(\d*)\sblue/)
  const blue = blueMatch ? parseInt(blueMatch[1], 10) : 0
  const redMatch = rawRound.match(/(\d*)\sred/)
  const red = redMatch ? parseInt(redMatch[1], 10) : 0
  const greenMatch = rawRound.match(/(\d*)\sgreen/)
  const green = greenMatch ? parseInt(greenMatch[1], 10) : 0
  return { blue, red, green }
}
