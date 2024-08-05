const { existsSync, mkdirSync, rmSync } = require('fs')
const { execSync } = require('child_process')

const getFileName = (index) =>
  index >= 3
    ? `js-0${index}`
    : `mjs-0${index}`

const rmFolder = folderName => rmSync(
  `./${folderName}`,
  { recursive: true, force: true }
)

const initializePackage = folderName => {
  execSync(`npm init -y --scope @andersonnascimentoafsn --silent`, {
    cwd: `./${folderName}`
  })

  return folderName
}

const printNameAndPackageVersion = folderName => {
  const { name, version } = require(`./${folderName}/package.json`)
  console.log({ n: name, v: version })

  return folderName
}

const makeDirAndReturnName = (folderName) => {
  if (!existsSync(folderName)) {
    mkdirSync(folderName)
  }

  return folderName
}

const FOLDER_AMOUNT = 4
// Array.from({ length: FOLDER_AMOUNT }).forEach((_, index) => {
//   console.log(`Criando a pasta ${index + 1}`)
//   const folderName = makeDirAndReturnName(`./${getFileName(index + 1)}`)
//   initializePackage(folderName)
//   printNameAndPackageVersion(folderName)
//   rmFolder(folderName)
// })

Array.from(Array(FOLDER_AMOUNT).keys())
  .map(index => makeDirAndReturnName(getFileName(index + 1)))
  .map(folderName => initializePackage(folderName))
  .map(folderName => printNameAndPackageVersion(folderName))
  .map(folderName => rmFolder(folderName))