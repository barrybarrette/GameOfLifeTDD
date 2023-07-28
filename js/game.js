// Rules

// For a space that is alive:
//    Each cell with zero or one neighbor(s) dies, as if by solitude.
//    Each cell with two or three neighbors survives.
//    Each cell with four or more neighbors dies, as if by overpopulation.

// For a space that is dead:
//    Each cell with exactly three neighbors becomes alive.

const utils = require('./utils') // https://i.imgur.com/kbh5eJZ.jpeg

/**
 * Method that does the core game logic described above
 * @param boardState - A 2-dimensional array of 0s and 1s representing dead and alive cells, respectively
 * @type boardState number[][]
 * @returns The next board state after the rules have been applied to each cell
 */
function update(boardState) {

}

module.exports.update = update
