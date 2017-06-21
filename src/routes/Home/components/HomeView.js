import React from 'react'
import './HomeView.scss'
import { connect } from 'react-redux'

export const HomeView = (props) => (
  <div>
  	<Board board={props.state.minesweeper.board} />
  </div>
)

const Board = ({ board }) => (
	<div>
		{ board.map(x => x.map(y => <BoardPiece piece={y} />)) }
	</div>
)

const BoardPiece = ({ piece }) => {
	var styles = { marginLeft: (piece.x * 40), marginTop: (piece.y * 40) }
	return (
		<div className={piece.open ? "piece opened" : "piece unopened"} style={styles}> </div>
	)
}

const mapStateToProps = (state) => ({ state })

export default connect(mapStateToProps)(HomeView)