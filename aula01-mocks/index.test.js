const { error } = require('./src/constants')
const File = require('./src/file')
const { rejects, deepStrictEqual } = require('assert')
const User = require('./src/user.js')

  ;
(async () => {
  {
    const filePath = './mocks/emptyFile-invalid.csv'
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await rejects(result, rejection)
  }
  {
    const filePath = './mocks/fourItems-invalid.csv'
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await rejects(result, rejection)
  }
  {
    const filePath = './mocks/threeItems-valid.csv'
    const result = await File.csvToJson(filePath)
    const expected = [
      {
        "name": "Erick Wendel",
        "id": 123,
        "profession": "Javascript Instructor",
        "birthDay": 25
      },
      {
        "name": "Xuxa Da Silva",
        "id": 124,
        "profession": "Javascript Developer",
        "birthDay": 80
      },
      {
        "name": "John Doe",
        "id": 321,
        "profession": "Java Instructor",
        "birthDay": 30
      },
    ]

    const expectedObject = expected.map(item => new User({ id: item.id, name: item.name, profession: item.profession, age: item.birthDay }))

    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected))
    deepStrictEqual(result, expectedObject)
  }
})()
