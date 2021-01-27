//@ts-check

const assert = require('assert')

const parse = require('./index')
const msgs = require('../msgs')

const MowBotParseError = require('./mowbot-parse-error')

describe('parser', function(){
  const messages = msgs.botfileparser.parse
  it('throws on empty input', function(){
    const expectedError = new TypeError(messages.emptyFile)
    assert.throws(() => parse(''), expectedError)
  })
  it('throws on whitespace only input', function(){
    const expectedError = new TypeError(messages.emptyFile)
    assert.throws(() => parse(' '), expectedError)
    assert.throws(() => parse('\t'), expectedError)
    assert.throws(() => parse('\n'), expectedError)
    assert.throws(() => parse('\n\t'), expectedError)
    assert.throws(() => parse('\n \t  '), expectedError)
  })
  it('throws on single line input', function(){
    const expectedError = new Error(messages.singleLineFile)
    assert.throws(() => parse('abc'), expectedError)
    assert.throws(() => parse('\nabc'), expectedError)
    assert.throws(() => parse('\nabc\n'), expectedError)
  })
  it('throws on odd bot init lines', function(){
    const expectedError = new Error(messages.oddBotLines)
    assert.throws(() => parse('a\nb'))
    assert.throws(() => parse('a\nb\nc\nd'))
  })
})