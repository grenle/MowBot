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

module.exports = MowBotParseError