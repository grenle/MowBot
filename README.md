# MowBots - scriptable virtual mechanical mowers

This little program reads a description of MowBots on a grid
and simulates their reponses to the commands contained in
their description. It then outputs the positions of each bot
after executing their commands.

## Installation

```
# Get the files 
git clone https://github.com/grenle/MowBot.git
# Go to correct dir
cd MowBot
# Install the necessary libs
npm i
```

## Usage

Provided by the Yargs package (with light editing).

```
Demo: npm start
Usage: node index.js [options]

Options:
  -s, --show     Shows a graphical representation of grid       [boolean]
  -f, --file     File containing simulation information        [required]
  -h, --help     Show help                                      [boolean]
  -v, --version  Show version number                            [boolean]

Examples:
  npm start                    runs simulation on bundled text file from
                               problem description
  node index.js -f foo.txt     simulates MowBots described in foo.txt
  node index.js -s -f foo.txt  same as above but with a semi-graphical
                               representation of the grid before and after
                               simulation

You have a few demo files in the ./test-vectors directory
```

### Bot file format

A file would look like this:

```
55
44 S
GADDAAGADAA
22 N
AADGGDADGA
```

Understood with the following assumptions and rules:
- Coordinates are denoted by two digits for (x, y) so 41
  means (x: 4, y: 1)
- The coordinate system starts at (0, 0), the bottom left
  corner
- The first line of the file denotes the coordinates of the
  top right corner
- the next lines are bot lines:
  - these work in pairs, one per bot
  - the first of these indicated the coordinates of the bots
    starting position followed by a letter indicating its
    initial bearing (N)orth, (S)outh...
  - the second is a list of letters denoting a stream of
    commands with 'A' for move forward, 'G' for turn 90°
    left and 'D' for turn 90° right

More precisely, it is structured like so:

```
botfile = position CRLF 1*botline

position   = DIGIT DIGIT
bearing    = "N" | "E" | "W" | "S"
command    = "A" | "G" | "D"

botinit     = position bearing
botcommands = 1*command
botline     = botinit CRLF botcommands
```

## Testing

- `npm test` -- one shot run of all tests
- `mocha --watch` -- test on file change

## Dependencies

- *Yargs*  -- command line arguments parser

## Dev Dependencies

- *Mocha* -- testing

## TODO

- consider other MowBots when validating 'A' command
- test isAssociativeArray

## Log & ideas

- BotFiles are assumed small, with larger user input we
  should give errors with line number to be really helpful,
  which would be sufficiently complex to justify an extra
  parsing library, ideally one consuming xBNF grammars.
- Circular Buffer dependency is injected but not addstar,
  would this be problematic? Make command dispatcher case
  insensitive
- Weird bug sighted: the directory `msgs` was named
  `messages` but require'ing it gave an empty object.
  Built-in conflict? No error was given by node or ts-check.
- Using jsdoc, it is tempting to have the notions of Bearing
  and Command be type as `{('N'|'E'|'W'|'S')}` and
  `{('A'|'G'|'D')}` respectively, to get warnings when
  creating a new MowBot. We use strings instead because:
  - ts-check only works when passing a literal to the
    constructor. A variable will fail as javascript cannot
    coerce a string to a union of strings.
  - It doesn't help with values obtained from a file read
    and parse.
  - The software is driven by a user define text file, the
    typing will not give any sort of helpful messages to
    them.