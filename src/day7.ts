import { getInput, splitLines } from "./utils"

type Hand = number[]
type UnrankedRound = { hand: number[]; ranked: false; bid: number }
type HandRank = number[]
type Round = { hand: number[]; ranked: true; ranks: HandRank; bid: number }
type CardRanker = (char: string) => number
type HandTypeRanker = (hand: Hand) => number

export async function day7() {
  const input = await getInput(7)
  const defaultRounds = parseInput(input, defaultCardRanker)
  const jokerRounds = parseInput(input, jokerCardRanker)

  return { part1: part1(defaultRounds), part2: part2(jokerRounds) }
}

export function part1(rounds: UnrankedRound[]): number {
  const rankedRounds = rounds.map((round) =>
    addRanksToRound(round, defaultHandTypeRank)
  )
  const sortedRankedRounds = sortRankedRounds(rankedRounds)

  return scoreRounds(sortedRankedRounds)
}

export function part2(rounds: UnrankedRound[]): number {
  const rankedRounds = rounds.map((round) =>
    addRanksToRound(round, jokerHandTypeRank)
  )
  const sortedRankedRounds = sortRankedRounds(rankedRounds)

  return scoreRounds(sortedRankedRounds)
}

function sortRankedRounds(rounds: Round[]): Round[] {
  return rounds.sort((a, b) => {
    for (let i = 0; i < a.ranks.length; i++) {
      const diff = a.ranks[i] - b.ranks[i]
      if (diff !== 0) return diff
    }
  })
}

function scoreRounds(rounds: Round[]): number {
  return rounds.reduce((acc, round, i) => acc + round.bid * (i + 1), 0)
}

function addRanksToRound(
  round: UnrankedRound,
  handTypeRanker: HandTypeRanker
): Round {
  const ranks = [handTypeRanker(round.hand), ...round.hand]
  return { ...round, ranked: true, ranks }
}

function defaultHandTypeRank(hand: Hand): number {
  const counts = findCardCounts(hand)
  if (counts.length === 1) return 7
  if (counts.includes(4)) return 6
  if (isFullHouse(counts)) return 5
  if (counts.includes(3)) return 4
  if (isTwoPair(counts)) return 3
  if (counts.includes(2)) return 2
  return 1
}

function jokerHandTypeRank(hand: Hand): number {
  const counts = findCardCounts(hand)
  const jokerCount = hand.filter((n) => n === 0).length

  if (counts.length === 1 || jokerCount === 5) return 7
  if (counts.includes(4 - jokerCount)) return 6
  if (isFullHouse(counts) || (jokerCount === 1 && isTwoPair(counts))) return 5
  if (counts.includes(3 - jokerCount)) return 4
  if (isTwoPair(counts)) return 3
  if (counts.includes(2 - jokerCount)) return 2
  return 1
}

function findCardCounts(hand: Hand): number[] {
  const counts: Record<number, number> = {}
  for (const num of hand) {
    if (num !== 0) counts[num] = counts[num] ? counts[num] + 1 : 1
  }
  return Object.values(counts)
}

function isFullHouse(counts: number[]): boolean {
  return counts.includes(3) && counts.includes(2)
}

function isTwoPair(counts: number[]): boolean {
  return counts.filter((n) => n === 2).length === 2
}

export function parseInput(input: string, ranker: CardRanker): UnrankedRound[] {
  const lines = splitLines(input)
  return lines.map((line) => {
    const [hand, bidStr] = line.split(" ")
    return {
      hand: hand.split("").map(ranker),
      ranked: false,
      bid: parseInt(bidStr, 10),
    }
  })
}

export function defaultCardRanker(char: string): number {
  if (char === "A") return 14
  if (char === "K") return 13
  if (char === "Q") return 12
  if (char === "J") return 11
  if (char === "T") return 10
  return parseInt(char, 10)
}

export function jokerCardRanker(char: string): number {
  if (char === "J") return 0
  return defaultCardRanker(char)
}
