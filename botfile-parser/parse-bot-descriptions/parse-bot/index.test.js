//@ts-check

const assert = require('assert')
const parseBot = require('./index')

const msgs = require('../../../msgs')
const { isRegExp } = require('util')

const {
  badBotInitLine,
  badBotPosition,
  badBotX,
  badBotY,
  badBearing
} = msgs.botfileparser.parseBotDescriptions.parseBot

describe('parseBot', function(){
  describe('Nice successful parse', function(){
    it('Has no problem parsing a decent string', function(){
      const f = () => parseBot('38 W', 'KABOUM')
      const expected = {
        coordinates: {x: 3, y: 8},
        bearing: 'W',
        commands: ['K','A','B','O','U','M']
      }
      assert.deepStrictEqual(f(), expected)
    })
  })
  describe('Parse failures', function(){
    it('throws on bad position/bearing line', function(){
      const f = () => parseBot('12', '')
      const expectedError = {
        name: 'Error',
        message: badBotInitLine('12')
      }
      assert.throws(f, expectedError)
    })
    it('throws on bad position', function(){
      const f = () => parseBot('3 N', '')
      const expectedError = {
        name: 'Error',
        message: badBotPosition('3 N')
      }
      assert.throws(f, expectedError)
    })
    it('throws on bad position x', function(){
      const f = () => parseBot('A2 N', '')
      const expectedError = {
        name: 'Error',
        message: badBotX('A')
      }
      assert.throws(f, expectedError)
    })
    it('throws on bad position y', function(){
      const f = () => parseBot('2B W', '')
      const expectedError = {
        name: 'Error',
        message: badBotY('B')
      }
      assert.throws(f, expectedError)
    })
    it('throws on bad bearing', function(){
      const f = () => parseBot('24 O', '')
      const expectedError = {
        name: 'Error',
        message: badBearing('O')
      }
      assert.throws(f, expectedError)
    })
  })
})