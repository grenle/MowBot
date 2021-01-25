//@ts-check

class MowBot{
  static bearingToVector = {
    N: {x:  0, y:  1},
    E: {x:  1, y:  0},
    W: {x: -1, y:  0},
    S: {x:  0, y: -1},
  }
  /**
   * @todo inject the CircularArray class
   * @todo make command dispatcher case insensitive
   * @param {object} limit - how far we can
   * venture from the origin
   * @param {number} limit.x
   * @param {number} limit.y
   * @param {object} init
   * @param {object} init.coordinates - where to spawn the
   * bot
   * @param {number} init.coordinates.x
   * @param {number} init.coordinates.y
   * @param {string} init.bearing
   * @param {string[]} init.commands
   * @param {*} CircularArray - Not sure how to type this.
   * In typescript we would use an interface.
   */
  constructor(limit, init, CircularArray){
    this.visited = [init.coordinates]
    this.coordinates = init.coordinates
    this.limit = limit
    const bearingSymbols = 'NESW'.split('')
    const bearingI = bearingSymbols.indexOf(init.bearing)
    this.bearing = new CircularArray(bearingSymbols, bearingI)
    this.commands = init.commands
  }
  /**
   * Interprets the `commands` array and execute the
   * commands as method calls
   */
  execute(){
    this.commands.forEach(c => this.dispatchCommand(c))
  }
  /**
   * Interpret a command encoded as a letter into a method
   * call.
   * @param {string} command 
   */
  dispatchCommand(command){
    switch(command){
      case 'G':
        this.rotateLeft()
        break
      case 'D':
        this.rotateRigth()
        break
      case 'A':
        this.move()
        break
      default:
        console.warn(`Command ${command} no know: ignoring`)
    }
  }
  rotateLeft(){
    this.bearing.incrementIndex(-1)
  }
  rotateRigth(){
    this.bearing.incrementIndex(1)
  }
  isPositionInGrid(position){
    if(position.x > this.limit.x || position.x < 0){
      return false
    }
    if(position.y > this.limit.y || position.y < 0){
      return false
    }
    return true
  }
  move(){
    const vector = MowBot.bearingToVector[this.bearing.read()]
    const newPosition = {
      x: this.coordinates.x + vector.x,
      y: this.coordinates.y + vector.y
    }
    if(this.isPositionInGrid(newPosition)){
      this.coordinates = newPosition
      this.visited.push(newPosition)
    }
  }
  /**
   * A comfort function, similar to Python's `__str__`
   * (rather than `__repr__`). Will return a string with the
   * x, y and bearing of the bot for printing.
   * @example
   * // returns 91N
   * myIntrepidBot.report()`
   */
  report(){
    const {coordinates, bearing} = this
    const {x, y} = coordinates
    return `${x}${y}${bearing.read()}`
  }
}

module.exports = MowBot