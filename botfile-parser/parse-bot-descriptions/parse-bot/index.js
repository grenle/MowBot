//@ts-check

const msgs = require('../../../msgs')

function parseBot(init, commands){
  const allowedBearings = ['N','E','W','S']
  const {
    badBotInitLine,
    badBotPosition,
    badBotX,
    badBotY,
    badBearing
  } = msgs.botfileparser.parseBotDescriptions.parseBot
  const positionAndBearing = init.split(' ')
  if(positionAndBearing.length !== 2){
    throw new Error(badBotInitLine(init))
  }
  const [position, bearing] = positionAndBearing
  const coordinatesStrings = position.split('')
  if(coordinatesStrings.length !== 2){
    throw new Error(badBotPosition(init))
  }
  const x = Number.parseInt(coordinatesStrings[0])
  const y = Number.parseInt(coordinatesStrings[1])
  if(isNaN(x)){
    throw new Error(badBotX(coordinatesStrings[0]))
  }
  if(isNaN(y)){
    throw new Error(badBotY(coordinatesStrings[1]))
  }
  if(!allowedBearings.includes(bearing)){
    throw new Error(badBearing(bearing))
  }
  return {
    coordinates: {x, y},
    bearing,
    commands: commands.split('') // we leave checking to bot
  }
}

module.exports = parseBot