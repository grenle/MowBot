//@ts-check

const msgs = require('../../msgs')

function parseLimits(contents){
  const {badLimits, badXLimit, badYLimit} = msgs.botfileparser.parseLimits
  const rawLimits = contents[0].split('')
  if(rawLimits.length !== 2){
    throw new Error(badLimits(contents))
  }
  const limits = {
    x: Number.parseInt(rawLimits[0]),
    y: Number.parseInt(rawLimits[1])
  }
  if(!limits.x){
    throw new Error(badXLimit(rawLimits[0]))
  }
  if(!limits.y){
    throw new Error(badYLimit(rawLimits[1]))
  }
  return limits
}

module.exports = parseLimits