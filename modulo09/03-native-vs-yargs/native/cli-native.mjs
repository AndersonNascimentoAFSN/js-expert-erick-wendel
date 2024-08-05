// console.log(process.argv)

const [nodePath, filePath, ...commands] = process.argv


function parseArguments(commands) {
  const cmd = new Map()

  const commandPrefix = '--'
  for (const key in commands) {
    const index = parseInt(key, 10)
    const command = commands[key]

    if (!command.includes(commandPrefix)) continue

    cmd.set(
      command.replace(commandPrefix, ''),
      commands[index + 1]
    )
  }

  return Object.fromEntries(cmd)
}


console.log(parseArguments(commands))