//@ts-check

const msgs = require('../msgs')

// trivial function version of length method à la Python
function len(o){ return o.length }
// trivial function version of add
function ADD(x, y){ return x + y }

/**
 * Tests if `o` is what some languages would call an
 * associative array.
 * @param {*} o 
 */
function isAssociativeArray(o){
  return typeof o === 'object' && o !== null
}

/**
 * returns the minimum value in xs, designed with numbers in
 * mind, careful with how JavaScript treats `Number <
 * String` scenarios for example.
 * @param {*} xs 
 */
function min(xs){
  if(xs.length === 0){
    throw new TypeError(msgs.utils.min.noValues)
  }
  if(xs.length === 1){
    return xs[0]
  }
  let min = xs[0]
  xs.slice(1).forEach( x => {
    if(x < min){
      min = x
    }
  })
  return min
}

/**
 * A Scheme-like map function, 2+ary. With uneven lengths,
 * considers only the minimum lengths of the array
 * arguments.
 *
 * `map(f, xs, ys ... zs)`
 *
 * `-> [ f(xs[0], ys[0] ... zs[0]), ..., f(xs[n], ys[n],
 * ..., zs[n])]`
 * @param {function} f 
 * @param {...*[]} xs
 */
function map(f, xs){
  const args = Array.prototype.slice.call(arguments, 1)
  const l = min(args.map(len))
  const res = new Array(l)
  for(let i = 0; i < l; i++){
    res[i] = f.apply(null, args.map(x=>x[i]))
  }
  return res
}

/** A read only circular buffer */
class CircularArray{
  /**
   * Creates a new circular array similar but not identical
   * in behaviour to a circular buffer. You obtain a value
   * from it with `read` and change the current read
   * position with `incrementIndex`. Here, there is no
   * controlled notion of a write pointer.
   * @param {(number|array)} sizeOrInitialData 
   * @param {number} [startIndex=0]
   */
  constructor(sizeOrInitialData, startIndex){
    const exceptionMsg = msgs.utils.CircularArray
    if(Number.isInteger(sizeOrInitialData)){
      if(sizeOrInitialData === 0){
        throw new Error(exceptionMsg.zeroLength)
      }
      this.data = new Array(sizeOrInitialData)
    }else if(Array.isArray(sizeOrInitialData)){
      if(sizeOrInitialData.length === 0){
        throw new Error(exceptionMsg.emptyArray)
      }
      this.data = sizeOrInitialData
    }else{
      throw new TypeError(exceptionMsg.badType)
    }
    // if default value is != 0, do a proper check for
    // undefined instead of implicit undefined ~ 0 ~ false
    this.index = startIndex ? startIndex : 0
  }
  /**
   * After a call to incrementIndex, our read index may be
   * negative or beyond the underlying array bounds. This
   * implements the wrapping behaviour. This could be done
   * dynamically in `read` from an arbitrary index but we
   * favour maintaining an inuitive value for the read index
   * and maintaining the illusion of a circle at that level.
   */
  normaliseIndex(){
    const l = this.data.length
    if(this.index < 0){
      this.index = l - 1 - (l - 1 - this.index) % l
    }else{
      this.index = this.index % l
    }
  }
  /**
   * Move the index by `amount`, wrapping around as
   * necessary. To decrement, simply use negative `amount`.
   * @param {number} amount
   */
  incrementIndex(amount){
    this.index += amount
    this.normaliseIndex()
  }
  read(){
    return this.data[this.index]
  }
}

class Bidic{
  /**
   * @param {object} [o={}]
   */
  constructor(o){
    if(o === undefined){
      o = {}
    }
    this.kToV = Object.assign({}, o)
    this.vToK = {}
    if(isAssociativeArray(o)){
      Object.entries(o).forEach(([k, v]) => {
        return this.vToK[v] = k
      })
    }else{
      throw TypeError(msgs.utils.Bidic.badType)
    }
  }
  addPair(key, value){
    this.kToV[key] = value
    this.vToK[value] = key
  }
  removeKPair(key){
    const reverseKey = this.kToV[key]
    delete this.kToV[key]
    delete this.vToK[reverseKey]
  }
  removeVPair(value){
    const reverseKey = this.vToK[value]
    delete this.kToV[reverseKey]
    delete this.vToK[value]
  }
}

module.exports = {
  ADD,
  min,
  map,
  CircularArray,
  Bidic
}