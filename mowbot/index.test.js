//@ts-check

const assert = require('assert')
const MowBot = require('./index')
const CircularArray = require('../utils').CircularArray

describe('MowBot', function(){
  describe('Instantiation', function(){
    it('Instantiates Properly', function(){
      const mb = new MowBot(
        {
          x: 5,
          y: 4
        },{
          coordinates: {
            x: 3, y: 2
          },
          bearing: 'W',
          commands: ['A']
        }, CircularArray)
        assert.strictEqual(mb.bearing.index, 3)
        assert.deepStrictEqual(mb.commands, ['A'])
      })
    })
  })