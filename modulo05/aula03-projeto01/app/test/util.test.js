const { describe, it } = require('mocha')
const { expect } = require('chai')
const TextProcessorFluentAPI = require('../src/textProcessorFluentAPI')
const mock = require('./mock/valid')
const { InvalidRegexError, evaluateRegex } = require('../src/util/invalidRegexError')

describe('Util', () => {
  it('#evaluateRegex should throw an error if the regex is unsafe', () => {
    const unsafeRegex = /^([a-z|A-Z|0-9]+\s?)+$/
    /* 
    // Fica rodando em loop e quebra tudo!
    Catastrophic Backtracking!
    
      time \
      node --eval "/^([a-z|A-Z|0-9]+\s?)+$/.test('eaae man como vai voce e como vai voce?') && console.log('legalzin')"
    */
    expect(() => evaluateRegex(unsafeRegex)).to.throw(InvalidRegexError, `This ${unsafeRegex} is unsafe dude!`)
  })
  it('#evaluateRegex should not throw an error using a safe regex', () => {
    const safeRegex = /([a-z|])$/
    expect(() => evaluateRegex(safeRegex)).to.not.throw()
    expect(evaluateRegex(safeRegex)).to.be.equal(safeRegex)
  })
})