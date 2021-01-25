//@ts-check

const msgs = require('../msgs')

const parseLimits = require('./parse-limits')
const parseBotDescriptions = require('./parse-bot-descriptions')

function getLines(contents){
  return contents
  .trimStart()
  .trimEnd()
  .split('\n')
  .filter(s => s)
}

/**
 * Parses the contents of a bot description text file into a
 * directly usable object.
 * @param {string} contents
 */
function parse(contents){
  const contentParts = getLines(contents)
  if(contentParts.length === 0){
    throw new TypeError(msgs.botfileparser.parse.emptyFile)
  }
  if(contentParts.length === 1){
    throw new Error(msgs.botfileparser.parse.singleLineFile)
  }
  if(contentParts.length % 2 === 0){
    throw new Error(msgs.botfileparser.parse.oddBotLines)
  }
  const limits = parseLimits(contentParts)
  const botsInit = parseBotDescriptions(contentParts)
  return { limits, botsInit }
}

module.exports = parse