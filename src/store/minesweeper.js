// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_BOARD = 'UPDATE_BOARD'

// ------------------------------------
// Actions
// ------------------------------------

export function update (board) {
  return {
    type    : UPDATE_BOARD,
    payload : board
  }
}

// ------------------------------------
// Specialized Action Creator
// ------------------------------------
export const openPosition = (element) => {
    return function(dispatch, getState) {
        var piece = { ...element };
        // if flagged, return
        if (piece.is_flag || piece.is_open) return;
        // if mine, game over
        if (piece.has_mine) gameOver(); //todo
        // else process all changes that need to be made
        var board = getState().minesweeper.board;
        var width = getState().minesweeper.width;
        var height = getState().minesweeper.height;
        var new_board = updatePiece(piece, board, width, height);

        dispatch(update(board));        
    }
    
}

export const setFlag = (element) => {
    return function(dispatch, getState) {
        if (element.is_open) return;
        var piece = { ...element, is_flag: !element.is_flag };
        var board = getState().minesweeper.board;
        board[piece.x][piece.y] = piece;
        dispatch(update(board));
    }
}

const updatePiece = (element, board, width, height) => {
    if (element.is_open) return board;
    var piece = { ...element };
    piece.surrounding = calculateSurroundingMines(piece, board, width, height);
    piece.is_open = true;

    var new_board = { ...board };
    new_board[piece.x][piece.y] = piece;

    if (piece.surrounding === 0) return openSurroundingMines(piece, new_board, width, height);
    return new_board;
}

const calculateSurroundingMines = (element, board, width, height) => {
    var startx = element.x === 0 ? 0 : element.x - 1;
    var endx = element.x === width - 1 ? element.x : element.x + 1;
    var starty = element.y === 0 ? 0 : element.y - 1;
    var endy = element.y === height - 1 ? element.y : element.y + 1;

    var mines = 0;
    for (var i = startx; i < endx + 1; i++) {
        for (var j = starty; j < endy + 1; j++) {
            if (board[i][j].has_mine) mines++;
        }
    } 

    return mines;
}

const openSurroundingMines = (element, board, width, height) => {
    var new_board = { ...board }; 
    var startx = element.x === 0 ? 0 : element.x - 1;
    var endx = element.x === width - 1 ? element.x : element.x + 1;
    var starty = element.y === 0 ? 0 : element.y - 1;
    var endy = element.y === height - 1 ? element.y : element.y + 1;

    for (var i = startx; i < endx + 1; i++) {
        for (var j = starty; j < endy + 1; j++) {
            new_board = updatePiece(board[i][j], board, width, height);
        }
    } 
    return new_board;
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [UPDATE_BOARD] : (state, action) => {
  	return {...state, board: action.payload }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------

//initialization
const MINES = 10;
const BOARD_WIDTH = 9;
const BOARD_HEIGHT = 9;
const initialState = { board: makeBoard(), mines: MINES, width: BOARD_WIDTH, height: BOARD_HEIGHT, firstClick: true }

export default function minesweeperReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

function makeBoard() {
	var board = [];
    // build two dimensional array with all board pieces
	for (var i = 0; i < BOARD_WIDTH; i++) {
		board[i] = [];
		for (var j = 0; j < BOARD_HEIGHT; j++) {
			board[i][j] = { x: i, y: j, has_mine: false, is_open: false, is_flag: false, surrounding: null };
		}
	}

    //place mines
    var mines_remaining = MINES;
    while (mines_remaining > 0) {
        //find x and y coordinates to place mine
        var i = Math.floor(Math.random() * (BOARD_WIDTH));
        var j = Math.floor(Math.random() * (BOARD_HEIGHT));

        //if there is no mine, place mine and decrement remaining
        if (!board[i][j].has_mine) {
            board[i][j].has_mine = true;
            mines_remaining -= 1;
        }

        //else, continue placing mines until none remain
    }

    return board;
}



