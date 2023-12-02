import fs from "fs"

export function getDayArray() {
  const dayIndex = process.argv.indexOf("--day") + 1
  if (dayIndex === 0) {
    return Array.from({ length: 25 }, (v, k) => k + 1)
  }
  return process.argv[dayIndex].split(",").map((day) => parseInt(day, 10))
}

export function getInput(day): Promise<string> {
  return new Promise((resolve) => {
    fs.readFile(`src/inputs/${day}.txt`, (err, data) => {
      if (err) throw err

      resolve(data.toString())
    })
  })
}

export function splitLines(input: string): string[] {
  return input.replace(/\n$/, "").split("\n")
}
