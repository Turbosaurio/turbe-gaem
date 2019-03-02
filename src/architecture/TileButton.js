import React from 'react'
import {connect} from 'react-redux'
import {setPlayerCoords} from '../redux/actions/config'


function TileButton ({posY, posX, _movePlayer}){
	return(
		<button
			style={{top: posY * 35 + 219, left: posX * 75 + 26}}
			title={`${posY}_${posX}`}
			className="tile-button"
			onClick={ _ => _movePlayer(posY, posX)}
		/>
	)
}

const mapDispatchToProps = dispatch => {
	return{
		_movePlayer : (y, x) => dispatch(setPlayerCoords({y,x}))
	}
}

export default connect(null, mapDispatchToProps)(TileButton)