//@ts-check

const msgs = require('../../msgs')

const parseBot = require('./parse-bot')

function parseBotDescriptions(lines){
  const mowerDescriptions = []
  const allowedBearings = ['N','E','W','S']
  for(let i = 1; i < lines.length; i+=2){
    const [init, commands] = lines.slice(i, i + 2)
    mowerDescriptions.push(parseBot(init, commands))
  }
  return mowerDescriptions
}

module.exports = parseBotDescriptions