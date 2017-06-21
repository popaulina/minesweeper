import React from 'react'
import './HomeView.scss'
import { connect } from 'react-redux'
import { openPosition, setFlag, reset } from '../../../store/minesweeper'
import { Button } from 'react-bootstrap'

export const HomeView = (props) => (
  <div>
  	<Board board={props.state.minesweeper.board} open={props.open} flag={props.flag} game_over={props.state.minesweeper.game_over} remaining={props.state.minesweeper.remaining} reset={props.reset} />
  </div>
);

const Board = ({ board, open, flag, game_over, remaining, reset }) => (
	<div>
		<Button onClick={reset}>Reset</Button>
		<div className="text-center">Remaining: {remaining}</div>
		{ board.map(x => x.map(y => <BoardPiece piece={y} open={open} flag={flag} game_over={game_over} remaining={remaining} />)) }
	</div>
)

const BoardPiece = ({ piece, open, flag, game_over, remaining }) => {
	var styles = { marginLeft: (piece.x * 40), marginTop: (piece.y * 40) }
	var classes = "piece ";
	classes += piece.is_open ? "opened " : "unopened ";
	classes = piece.is_flag ? "piece flag " : classes;
	classes = piece.has_mine && game_over ? "piece mine" : classes;
	return (
		<Button className={classes} 
			style={styles} 
			onClick={() => open(piece)} 
			onContextMenu={(e) => { e.preventDefault(); flag(piece); }} 
			disabled={game_over || remaining === 0}
		> 
			{ piece.surrounding && !piece.has_mine ? piece.surrounding : "" }
		</Button>
	)
}

const mapStateToProps = (state) => ({ state })

const mapDispatchToProps = (dispatch) => ({
	open: (piece) => dispatch(openPosition(piece)),
	flag: (piece) => dispatch(setFlag(piece)),
	reset: () => dispatch(reset())
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)