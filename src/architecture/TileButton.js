import React from 'react'
import {connect} from 'react-redux'
import {setPlayerCoords} from '../redux/actions/config'


function TileButton ({top, left, _movePlayer, y, x}){
	return(
		<button
			style={{top: top * 35 + 219, left: left * 75 + 26}}
			title={`${y}_${x}`}
			className="tile-button"
			onClick={ _ => _movePlayer(y, x)}
		/>
	)
}

const mapDispatchToProps = dispatch => {
	return{
		_movePlayer : (y, x) => dispatch(setPlayerCoords({y,x}))
	}
}

export default connect(null, mapDispatchToProps)(TileButton)