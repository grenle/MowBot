//@ts-check

class Board{
  static bearingToSigil = {
    N: '^ ',
    E: ' >',
    W: '< ',
    S: 'v '
  }
  static sideBySide(boardA, boardB){
    const rowsA = boardA.rows()
    const rowsB = boardB.rows()
    let s = ''
    rowsA.forEach( (_, i) => {
      s += `${rowsA[i]}    >    ${rowsB[i]}\n`
    })
    return s
  }
  constructor(bots){
    const {limit} = bots[0]
    const {x, y} = limit
    this.board = []
    for(let row = 0; row < y+1; row++){
      this.board[row] = []
      for(let col = 0; col < x+1; col++){
        this.board[row][col] = '# '
      }
    }
    bots.forEach(bot => {
      bot.visited.forEach(visitedTile => {
        this.cut(visitedTile)
      })
      this.spawn(bot.coordinates, bot.bearing.read())
    })
  }
  cut(coordinates){
    const {x, y} = coordinates
    this.board[y][x] = '. '
  }
  spawn(coordinates, bearing){
    const {x, y} = coordinates
    this.board[y][x] = Board.bearingToSigil[bearing]
  }
  rows(){
    return [...this.board]
    .reverse()
    .map(line => line.join(''))
  }
  show(){
    return this.rows()
    .join('\n')
  }
}

module.exports = Board