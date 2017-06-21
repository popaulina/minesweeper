// ------------------------------------
// Constants
// ------------------------------------
export const OPEN_POSITION = 'OPEN_POSITION'

// ------------------------------------
// Actions
// ------------------------------------

export function update (board) {
  return {
    type    : OPEN_POSITION,
    payload : board
  }
}

// ------------------------------------
// Specialized Action Creator
// ------------------------------------
export const openPosition = (board, element) => {
  //todo
}


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [OPEN_POSITION]    : (state, action) => {
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



