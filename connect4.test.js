"use strict";

beforeEach(function () {
  console.log("Run once before each test starts");

  // reset & make in-memory board
  boardMatrix.length = 0;
  makeBoard();

  // reset & make html board
  let htmlBoard = document.getElementById('board');
  htmlBoard.innerHTML = "";
  makeHtmlBoard();

  // reset currPlayer
  currPlayer = 1;
});


describe('makeBoard', function () {

  it('makes the in-memory board', function () {
    expect(boardMatrix.length).toEqual(HEIGHT);

    for (const row of boardMatrix) {
      expect(row.length).toEqual(WIDTH);
    }
  });

  it('in-memory board rows should have unique identity', function () {
    const rows = new Set(boardMatrix);
    expect(rows.size).toEqual(boardMatrix.length);
  });
});


describe('makeHtmlBoard', function () {

  it('makes the html board', function () {
    let htmlBoard = document.getElementById('board');

    // num rows should be HEIGHT + 1 to account for clickable top row
    expect(htmlBoard.rows.length).toEqual(HEIGHT + 1);

    for (const tableRow of htmlBoard.rows) {
      expect(tableRow.cells.length).toEqual(WIDTH);
    }
  });
});


describe('findSpotForCol', function () {

  it('finds the next available spot in column', function () {
    const y = HEIGHT - 1;
    const x = 0;

    expect(findSpotForCol(x)).toEqual(y);

    boardMatrix[y][x] = "filled";

    expect(findSpotForCol(x)).toEqual(y - 1);
  });

  it('returns null if column filled', function () {
    let y = 0;
    const x = 1;

    while (y < HEIGHT) {
      boardMatrix[y][x] = "filled";
      y++;
    }

    expect(findSpotForCol(x)).toEqual(null);
  });
});


describe('placeInTable', function () {

  it('adds piece to the html board', function () {
    const x = 0;
    const y = HEIGHT - 1;
    const spot = document.getElementById(`c-${y}-${x}`);

    expect(spot.innerHTML).toEqual("")
    placeInTable(y, x);
    expect(spot.innerHTML).toEqual(`<div class="piece p${currPlayer}"></div>`)
  });
});


describe('handleClick', function () {

  it('it switches players', function () {
    const evt = { target: { id: "top-0" } };
    console.log('current player=', currPlayer);
    expect(currPlayer).toEqual(1);

    handleClick(evt);
    console.log('current player=', currPlayer);
    expect(currPlayer).toEqual(2);

    handleClick(evt);
    console.log('current player=', currPlayer);
    expect(currPlayer).toEqual(1);
  });

  it('it updates in-memory board with correct player', function () {
    let y = HEIGHT - 1;
    const x = 0;

    const evt = { target: { id: `top-${x}` } };

    // spot on board is empty
    // after one call to handleClick, gets updated with player 1
    expect(boardMatrix[y][x]).toEqual(null);
    handleClick(evt);
    expect(boardMatrix[y][x]).toEqual(1);

    // increment y to next unfilled row for x
    y = HEIGHT - 2;

    // spot on board is empty
    // after next call to handleClick, gets updated with player 2
    expect(boardMatrix[y][x]).toEqual(null);
    handleClick(evt);
    expect(boardMatrix[y][x]).toEqual(2);
  });

  it('it updates html board with correct pieces', function () {
    let y = HEIGHT - 1;
    const x = 0;

    let spot = document.getElementById(`c-${y}-${x}`);
    const evt = { target: { id: `top-${x}` } };

    // spot on html board empty
    // after one call to handleClick, gets updated with player 1 piece
    expect(spot.innerHTML).toEqual("")
    handleClick(evt);
    expect(spot.innerHTML).toEqual('<div class="piece p1"></div>')

    // increment y to next empty row for x
    // get new spot
    y = HEIGHT - 2;
    spot = document.getElementById(`c-${y}-${x}`);

    // spot on html board empty
    // after next call to handleClick, gets updated with player 2 piece
    expect(spot.innerHTML).toEqual("")
    handleClick(evt);
    expect(spot.innerHTML).toEqual('<div class="piece p2"></div>')
  });
});


describe('checkForWin', function () {

  it('returns undefined if no winner', function () {
    expect(checkForWin()).toEqual(undefined);
  });

  it('returns true if there is a winner', function () {
    boardMatrix[0][1] = 1;
    boardMatrix[0][2] = 1;
    boardMatrix[0][3] = 1;
    boardMatrix[0][4] = 1;

    expect(checkForWin()).toEqual(true);
  });
});
