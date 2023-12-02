import { dayRunners } from "./days"

async function runnerWrapper() {
  for (const runnerObject of dayRunners) {
    const { day, runner } = runnerObject
    console.log(`****************************************`)
    console.log(`Calculating answers for Day ${day}:`)
    console.time(`Day ${day} Benchmark`)
    const { part1, part2 } = await runner()
    console.timeEnd(`Day ${day} Benchmark`)
    console.log("Part 1:", part1)
    console.log("Part 2:", part2)
    console.log(`****************************************`)
  }
}
runnerWrapper()
