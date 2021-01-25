//@ts-check

function boardPrint(limits){
  const board = [...new Array(5).fill(
    [...new Array(5)].fill('. ')
  )]
  const s = [...board]
  .reverse()
  .map(line => line.join('')).join('\n')
  console.log(s)
}

module.exports = boardPrint