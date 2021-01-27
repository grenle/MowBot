//@ts-check

class MowBotParseError extends Error{
  /**
   * We depart from standard Error's: The fileName and
   * line/column numbers aren't places where the code blew
   * up but places where the erroneous data was found.
   * @param {string} line
   * @param {string} fileName
   * @param {number} lineNumber
   * @param {number} columnNumber
   * @param {boolean} [fullLine=false] - does the error cover the whole line?
   */
  constructor(line, fileName, lineNumber, columnNumber, fullLine){
    super(line)
    this.fileName = fileName
    this.lineNumber = lineNumber
    this.columnNumber = columnNumber
    this.fullLine = fullLine
    this.name = this.constructor.name
  }
}

function parse(fileName, lines){
  const statuses = {
    topRightCoordinates: 0,
    topRightX: 1,
    topRightY: 2,
    botInit: 3,
    botInitX: 4,
    botInitY: 5,
    botInitBearing: 6,
    botCommand: 7
  }
  this.parseResult = {}
  let status = statuses.topRightCoordinates
  lines.forEach(function(line, lineNumber){
    //console.log(`${lineNumber}: ${line}`)
      switch(status){
        case statuses.topRightCoordinates:
          parseTopRightCoordinates(line, fileName, lineNumber)
          status = statuses.botInit
          break
        case statuses.botInit:
          parseBotInit(line, fileName, lineNumber)
          status = statuses.botCommand
        default:
          console.log('oh noes')
      }
  })
}

function parseTopRightCoordinates(line, fileName, lineNumber){
  if(line.length !== 2){
    const errMsg = 'top right coordinates must be two digits for topRight corner x y'
    throw new MowBotParseError(errMsg, fileName, lineNumber, 0, true)
  }
  const xString = line.charAt(0)
  const yString = line.charAt(1)
  const x = Number.parseInt(xString)
  const y = Number.parseInt(yString)
  const errMsg = v => `Error parsing top right coordinate: could not parse '${v}' as a number`
  if(isNaN(x)){
    throw new MowBotParseError(errMsg(xString), fileName, lineNumber, 0)
  }
  if(isNaN(y)){
    throw new MowBotParseError(errMsg(yString), fileName, lineNumber, 1)
  }
}

function parseBotInit(line, fileName, lineNumber){
  if(line.length !== 4){
    let errMsg = 'Bot initial position must be 4 characters long:'
    errMsg += '\n'
    errMsg += '2 characters for the x y start position'
    errMsg += '\n'
    errMsg += '1 character for the bot start bearing'
  }
  const startX = line.charAt(0)
  const startY = line.charAt(1)
  const sep = line.charAt(2)
  const bearing = line.charAt(3)
  const [x, y] = [startX, startY].map(s => Number.parseInt(s))
  const errMsg = v => `Could not parse bot start position '${v}' as a number`
  if(isNaN(x)){
    throw new MowBotParseError(errMsg(startX), fileName, lineNumber, 0)
  }
  if(isNaN(y)){
    throw new MowBotParseError(errMsg(startY), fileName, lineNumber, 1)
  }
}

function getLines(contents){
  return contents
  .trimStart()
  .trimEnd()
  .split('\n')
  .filter(s => s)
}

const s = '12\n14 N\nDAGGAD'

try{
  parse('filename', getLines(s))
}catch(e){
 console.log(e.message)
}