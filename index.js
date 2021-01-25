//@ts-check

const utils = require('./utils')

const argv = require('yargs/yargs')(process.argv.slice(2))
    .usage('Usage: $0 [options]')
    .example('$0 -f foo.txt', 'simulates MowBots described in foo.txt')
    .alias('s', 'show')
    .boolean('s')
    .describe('s', 'Shows a graphical representation of grid')
    .alias('f', 'file')
    .nargs('f', 1)
    .describe('f', 'File containing simulation information')
    .demandOption(['f'])
    .help('h')
    .alias('h', 'help')
    .alias('v', 'version')
    .argv;

const fs = require('fs').promises

const parse = require('./botfile-parser')
const MowBot = require('./mowbot')

const Board = require('./board')

async function main(){
  const {file, show} = argv  
  const filepath = String(file)
  let rawInitValues = ''
  try{
    rawInitValues = await fs.readFile(filepath, {
      encoding: 'utf8'
    })
  }catch(e){
    console.error(`Could not open file ${filepath}`)
    process.exitCode = 1
    return
  }
  try{
    const extractedData = parse(rawInitValues)
    const {limits, botsInit} = extractedData
    const boards = {}
    const bots = botsInit.map(botInit => {
      const bot = new MowBot(limits, botInit, utils.CircularArray)
      return bot
    })
    boards.pre = new Board(bots)
    bots.forEach(bot => {
      bot.execute()
      console.log(bot.report())
    })
    boards.post = new Board(bots)
    if(show){
      console.log()
      console.log(Board.sideBySide(boards.pre, boards.post))
      console.log()
    }
  }catch(e){
    // not much we can do, at least tell the user why we
    // failed to simulate his Automated Mowing Army.
    console.log(e.message)
    process.exitCode = 1
    return
  }
  
}

main()
