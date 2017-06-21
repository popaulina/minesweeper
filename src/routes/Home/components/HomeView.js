import React from 'react'
import './HomeView.scss'
import { connect } from 'react-redux'
import { openPosition, setFlag } from '../../../store/minesweeper'
import { Button } from 'react-bootstrap'

export const HomeView = (props) => (
  <div>
  	<Board board={props.state.minesweeper.board} open={props.open} flag={props.flag} />
  </div>
);

const Board = ({ board, open, flag }) => (
	<div>
		{ board.map(x => x.map(y => <BoardPiece piece={y} open={open} flag={flag} />)) }
	</div>
)

const BoardPiece = ({ piece, open, flag }) => {
	var styles = { marginLeft: (piece.x * 40), marginTop: (piece.y * 40) }
	return (
		<Button className={piece.is_open ? "piece opened" : "piece unopened"} 
			style={styles} 
			onClick={() => open(piece)} 
			onContextMenu={(e) => { e.preventDefault(); flag(piece); }} 
		> 
			{ piece.surrounding ? piece.surrounding : "" }
		</Button>
	)
}

const mapStateToProps = (state) => ({ state })

const mapDispatchToProps = (dispatch) => ({
	open: (piece) => dispatch(openPosition(piece)),
	flag: (piece) => dispatch(setFlag(piece))
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)