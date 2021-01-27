//@ts-check

const utils = require('./utils')

const argv = require('yargs/yargs')(process.argv.slice(2))
    .usage('Usage: $0 [options]')
    .example('$0 -f foo.txt', 'simulates MowBots described in foo.txt')
    .example('$0 -s -f foo.txt', 'same as above but with a semi-graphical representation of the grid before and after simulation')
    .alias('s', 'show')
    .boolean('s')
    .describe('s', 'Shows a graphical representation of grid')
    .alias('f', 'file')
    .nargs('f', 1)
    .describe('f', 'File containing simulation information')
    .help('h')
    .alias('h', 'help')
    .alias('v', 'version')
    .argv;

const fs = require('fs').promises

const parse = require('./botfile-parser')
const MowBot = require('./mowbot')

const Board = require('./board')

function parseAndExecute(contents, show){
  try{
    const extractedData = parse(contents)
    const {limits, botsInit} = extractedData
    const boards = {}
    const bots = botsInit.map(botInit => {
      const bot = new MowBot(limits, botInit, utils.CircularArray)
      return bot
    })
    boards.pre = new Board(bots)
    bots.forEach(bot => {
      console.log(bot.execute())
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

async function main(){
  const {file, show} = argv
  const filepath = String(file)
  let rawInitValues = ''
  if(Boolean(process.stdin.isTTY)){
    if(!file){
      console.error('MowBot requires either -f <filepath> of piped content, neither given')
      process.exitCode = 1
      return
    }
    try{
      rawInitValues = await fs.readFile(filepath, {
        encoding: 'utf8'
      })
      parseAndExecute(rawInitValues, show)
    }catch(e){
      console.error(`Could not open file ${filepath}`)
      process.exitCode = 1
      return
    }
  }else{
    const {stdin} = process
    stdin.on('data', function(chunk){
      rawInitValues += chunk
    })
    stdin.on('end', function(){
      parseAndExecute(rawInitValues, show)
    })
  }

  
}

main()
