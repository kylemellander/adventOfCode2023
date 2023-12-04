import { getInput, splitLines } from "./utils"

type Card = {
  id: number
  winningNumbers: string[]
  cardNumbers: string[]
  copies: number
}

export async function day4() {
  const input = await getInput(4)
  const cards = parseInput(input)

  return {
    part1: part1(cards),
    part2: part2(cards),
  }
}

export function part1(cards: Card[]): number {
  return cards.reduce((acc, card) => acc + scoreCard(card), 0)
}

export function part2(cards: Card[]): number {
  let count = 0
  cards.forEach((card, i) => {
    const matches = countMatches(card)
    for (let a = 0; a < card.copies; a++) {
      for (let j = 1; j <= matches; j++) {
        const cardToIncrement = cards[i + j]
        if (cardToIncrement) cardToIncrement.copies += 1
      }
      count += 1
    }
  })
  return count
}

function scoreCard(card: Card): number {
  const matchingWinningNumbers = card.cardNumbers.filter((cardNumber) =>
    card.winningNumbers.includes(cardNumber)
  )
  if (matchingWinningNumbers.length === 0) return 0
  if (matchingWinningNumbers.length === 1) return 1
  return 2 ** (matchingWinningNumbers.length - 1)
}

function countMatches(card) {
  return card.cardNumbers.filter((cardNumber) =>
    card.winningNumbers.includes(cardNumber)
  ).length
}

export function parseInput(input: string) {
  return splitLines(input).map((line) => lineToCard(line))
}

function lineToCard(line: string): Card {
  const match = line.match(/Card\s*(\d*)\:\s(.*)\s\|\s(.*)/)
  const id = parseInt(match[1], 10)
  const winningNumbers = match[2].split(" ").filter((n) => n !== "")
  const cardNumbers = match[3].split(" ").filter((n) => n !== "")
  return { id, winningNumbers, cardNumbers, copies: 1 }
}
