//@ts-check

const utils = require('./utils')

const argv = require('yargs/yargs')(process.argv.slice(2))
    .usage('Usage: $0 [options]')
    .example('$0 -f foo.txt', 'simulates MowBots described in foo.txt')
    .alias('f', 'file')
    .nargs('f', 1)
    .describe('f', 'File containing simulation information')
    .demandOption(['f'])
    .conflicts('s', 'f')
    .help('h')
    .alias('h', 'help')
    .alias('v', 'version')
    .argv;

const fs = require('fs').promises

const parse = require('./botfile-parser')
const MowBot = require('./mowbot')

async function main(){
  const {file} = argv  
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
      const bots = botsInit.map(botInit => {
      return new MowBot(limits, botInit, utils.CircularArray)
    })
    bots.forEach(b => {
      b.execute()
      console.log(b.report())
    })
  }catch(e){
    // not much we can do, at least tell the user why we
    // failed to simulate his Automated Mowing Army.
    console.log(e.message)
    process.exitCode = 1
    return
  }
  
}

main()
