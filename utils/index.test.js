//@ts-check

const assert = require('assert')
const utils = require('./index')
const msgs = require('../msgs')

const {ADD} = utils

describe('utils', function(){
  describe('min', function(){
    it('throw when called with empty array', function(){
      const {min} = utils
      const expectedError = {
        name: 'TypeError',
        message: msgs.utils.min.noValues
      }
      assert.throws(() => min([]), )
    })
    it('behaves well with one item', function(){
      const {min} = utils
      assert.strictEqual(min([9]), 9)
    })
    it('behaves well with naturals', function(){
      const {min} = utils
      assert.strictEqual(min([2, 9, 4, 1, 3]), 1)
      assert.strictEqual(min([0, 9, 4, 1, 3]), 0)
      assert.strictEqual(min([2, 9, 4, 1, 0]), 0)
    })
    it('behaves well with integers', function(){
      const {min} = utils
      assert.strictEqual(min([10, -1, 3, 20]), -1)
      assert.strictEqual(min([10, -1, 3, -20]), -20)
      assert.strictEqual(min([-10, -1, 3, 20]), -10)
    })
  })
  describe('map', function(){
    it('works with empty array', function(){
      const {map} = utils
      const xs = []
      const ys = map(ADD, [])
      assert.deepStrictEqual(xs, ys)
    })
    it('works with equal length arrays', function(){
      const {map} = utils
      const xs = [1, 3]
      const ys = [2, 4]
      const zs = [3, 7]
      assert.deepStrictEqual(map(ADD, xs, ys), zs)
    })
    it('works with unequal length arrays', function(){
      const {map} = utils
      const xs = [1, 3, 5]
      const ys = [2, 4]
      const zs = [3, 7]
      assert.deepStrictEqual(map(ADD, xs, ys), zs)
    })
  })
  describe('CircularArray', function(){
    it('throws with an length of 0', function(){
      const {CircularArray} = utils
      const expectedError = {
        name: 'Error',
        message: msgs.utils.CircularArray.zeroLength
      }
      assert.throws(() => new CircularArray(0, 0), expectedError)
    })
    it('throws with an empty array', function(){
      const {CircularArray} = utils
      const expectedError = {
        name: 'Error',
        message: msgs.utils.CircularArray.emptyArray
      }
      assert.throws(() => new CircularArray([], 0), expectedError)
    })
    it('throws with wrong type in constructor', function(){
      const {CircularArray} = utils
      const expectedError = {
        name: 'TypeError',
        message: msgs.utils.CircularArray.badType
      }
      // Deliberate error, so:
      //@ts-ignore
      assert.throws(() => new CircularArray('a', 0), expectedError)
    })
    it('behaves linearly with 0 < index < length', function(){
      const {CircularArray} = utils
      const cb = new CircularArray(['a', 'b'])
      assert.strictEqual(cb.read(), 'a')
      cb.incrementIndex(1)
      assert.strictEqual(cb.read(), 'b')
      cb.incrementIndex(-1)
      assert.strictEqual(cb.read(), 'a')
    })
    it('wrap around going right', function(){
      const {CircularArray} = utils
      const cb = new CircularArray(['a', 'b', 'c'])
      assert.strictEqual(cb.read(), 'a')
      cb.incrementIndex(3)
      assert.strictEqual(cb.read(), 'a')
    })
    it('wrap around going left', function(){
      const {CircularArray} = utils
      const cb = new CircularArray(['a', 'b', 'c'])
      assert.strictEqual(cb.read(), 'a')
      cb.incrementIndex(-3)
      assert.strictEqual(cb.read(), 'a')
    })
    it('normalises the index properly', function(){
      const {CircularArray} = utils
      const cb = new CircularArray(['a', 'b', 'c'])
      cb.incrementIndex(-4)
      assert.strictEqual(cb.index, 2)
    })
    it('allows non-zero index starting value', function(){
      const {CircularArray} = utils
      const cb = new CircularArray(['a', 'b', 'c'], 1)
      assert.strictEqual(cb.read(), 'b')
    })
  })

  describe ('Bidic', function(){
    it('throws on non _object_ (mapping) init', function(){
      const {Bidic} = utils
      const expectedError = {
        name: 'TypeError',
        message: msgs.utils.Bidic.badType
      }
      assert.throws(() => new Bidic(3), expectedError)
    })
    it('has correct k->v & v->k mappings at init', function(){
      const {Bidic} = utils
      const bd = new Bidic({a: 'b', foo: 'bar'})
      assert.strictEqual(bd.kToV['a'], 'b')
      assert.strictEqual(bd.vToK['b'], 'a')
      assert.strictEqual(bd.kToV['foo'], 'bar')
      assert.strictEqual(bd.vToK['bar'], 'foo')
    })
    it('allows insertion of new pairs', function(){
      const {Bidic} = utils
      const bd = new Bidic()
      bd.addPair('pretty', 'penny')
      assert.strictEqual(bd.kToV['pretty'], 'penny')
      assert.strictEqual(bd.vToK['penny'], 'pretty')
    })
    it('allows removal of k pairs', function(){
      const {Bidic} = utils
      const bd = new Bidic({mini: 'winnie'})
      assert.strictEqual(bd.kToV['mini'], 'winnie')
      assert.strictEqual(bd.vToK['winnie'], 'mini')
      bd.removeKPair('mini')
      assert.strictEqual(bd.kToV['mini'], undefined)
      assert.strictEqual(bd.vToK['winnie'], undefined)
    })
    it('allows removal of v pairs', function(){
      const {Bidic} = utils
      const bd = new Bidic({mini: 'winnie'})
      assert.strictEqual(bd.kToV['mini'], 'winnie')
      assert.strictEqual(bd.vToK['winnie'], 'mini')
      bd.removeVPair('winnie')
      assert.strictEqual(bd.kToV['mini'], undefined)
      assert.strictEqual(bd.vToK['winnie'], undefined)
    })
  })
})