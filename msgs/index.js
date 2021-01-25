//@ts-check

module.exports = {
  botfileparser:{
    parseBotDescriptions: {
      parseBot: {
        badBotInitLine: line => `Could not parse init line: ${line}`,
        badBotPosition: position => `Could not parse bot position: ${position}`,
        badBotX: x => `Could not parse bot position x as number: ${x}`,
        badBotY: y => `Could not parse bot position y as number: ${y}`,
        badBearing: bearing => `Could not parse bearing from ${bearing}`
      }
    },
    parse: {
      emptyFile: 'Botfile empty',
      singleLineFile: 'Input file contains no bot description',
      oddBotLines: 'Input file unreadable: 2 lines per MowBot required',
    },
    parseLimits: {
      badLimits: limitString => `Unparseable limits in file: ${limitString}`,
      badXLimit: xLimit => `Bad limit.x: (${xLimit}) is not an integer`,
      badYLimit: yLimit => `Bad limit.y: (${yLimit}) is not an integer`
    }
  },
  utils: {
    min: {
      noValues: 'min function requires an array of length > 0 (the minimum of no values has no meaning)'
    },
    CircularArray: {
      emptyArray: 'CircularBuffer cannot be constructed with empty array',
      zeroLength: 'CircularBuffer cannot be constructed with zero length',
      badType: 'CircularBuffer must be initialised with an array or a length'
    },
    Bidic: {
      badType: 'Bidic constructor requires an object'
    }
  }
}
