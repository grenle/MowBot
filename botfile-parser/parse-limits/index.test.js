//@ts-check

const assert = require('assert')
const parse = require('..')

const msgs = require('../../msgs')

const parseLimits = require('./index')

describe('parseLimits', function(){
  const {badLimits, badXLimit, badYLimit} = msgs.botfileparser.parseLimits
  it('fails on too short limits', function(){
    const vec = ['1']
    const err = {
      name: 'Error',
      message: badLimits('1')
    }
    assert.throws(() => parseLimits(vec), err)
  })
  it('fails on too long limits', function(){
    const vec = ['123']
    const err = {
      name: 'Error',
      message: badLimits('123')
    }
    assert.throws(() => parseLimits(vec), err)
  })
  it('fails on non numeric x limit', function(){
    const s = ['a9']
    const expectedError = new Error(badXLimit('a'))
    assert.throws(() => parseLimits(s), expectedError)
  })
  it('fails on non numeric y limit', function(){
    const s = ['9a']
    const expectedError = new Error(badYLimit('a'))
    assert.throws(() => parseLimits(s), expectedError)
  })
})