"use strict";

/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const boardMatrix = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {

  let row = [];
  row.length = HEIGHT;
  row.fill(null);

  boardMatrix.length = WIDTH;
  boardMatrix.fill(row);

}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: function decomp
  const htmlBoard = document.getElementById('board');

  // creating top row
  const topRow = document.createElement("tr");
  topRow.setAttribute("id", "column-top");

  // populate top row with tiles
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", `top-${x}`);
    headCell.addEventListener("click", handleClick);
    topRow.append(headCell);
  }

  htmlBoard.append(topRow);

  // dynamically creates the main part of html board
  // uses HEIGHT to create table rows
  // uses WIDTH to create table cells for each row
  for (let y = 0; y < HEIGHT; y++) {
    // Create a table row element and assign to a "row" variable
    const rowElement = document.createElement('tr');

    for (let x = 0; x < WIDTH; x++) {
      // Create a table cell element and assign to a "cell" variable
      const cellElement = document.createElement('td');
      // add an id, c-y-x, to the above table cell element
      // you'll use this later, so make sure you use c-y-x
      cellElement.setAttribute("id", `c-${y}-${x}`);

      // append the table cell to the table row
      rowElement.appendChild(cellElement);
    }

    // append the row to the html board
    htmlBoard.appendChild(rowElement);
  }
}

/** findSpotForCol: given column x, return bottom empty y (null if filled) */

function findSpotForCol(x) {
  // write the real version of this, rather than always returning 5
  // iterate bottom up
  for (let y = HEIGHT -1; y >= 0; y--) {
    // if boardMatrix x, y is not null, return y
    if (!(boardMatrix[x][y] === null)) {
      return y;
    }
  }
  // if whole column is filled
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // make a div and insert into correct table cell
  const playerPieceDiv = document.createElement('div');
  const tableCell = document.querySelector(`#c-${y}-${x}`);

  tableCell.appendChild(playerPieceDiv);
}

/** endGame: announce game end */

function endGame(msg) {
  // pop up alert message
  alert(msg);
}
/**
 *  checks if all cells are full
 * @returns boolean representing tie
 */
function checkIfBoardIsFull() {
  for (let x = 0;x < WIDTH; x++) {
    if (!(findSpotForCol(x) === null)) return false;
  }
  return true;
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  placeInTable(y, x);
  boardMatrix[x][y] = currPlayer;

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  if (checkIfBoardIsFull()) {
    return endGame(`Tie!`);
  }

  // switch players
  currPlayer = currPlayer === 1 ? 2 : 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {

  /** _win:
   * takes input array of 4 cell coordinates [ [y, x], [y, x], [y, x], [y, x] ]
   * returns true if all are legal coordinates for a cell & all cells match
   * currPlayer
   */
  function _win(cells) {

    // TODO: Check four cells to see if they're all legal & all color of current
    // player

  }

  // using HEIGHT and WIDTH, generate "check list" of coordinates
  // for 4 cells (starting here) for each of the different
  // ways to win: horizontal, vertical, diagonalDR, diagonalDL
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      // TODO: assign values to the below variables for each of the ways to win
      // horizontal has been assigned for you
      // each should be an array of 4 cell coordinates:
      // [ [y, x], [y, x], [y, x], [y, x] ]

      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert;
      let diagDL;
      let diagDR;

      // find winner (only checking each win-possibility as needed)
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
