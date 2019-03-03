import React from 'react'
import {connect} from 'react-redux'
import {setPlayerCoords} from '../redux/actions/config'
import {rotatePlayer} from '../functions/cameraFunctions'


function TileButton ({top, left, _movePlayer, y, x, camera}){
	const newPos = rotatePlayer(y, x, camera, 19)
	return(
		<button
			style={{top: top * 35 + 219, left: left * 75 + 26}}
			title={`${y}_${x}`}
			className="tile-button"
			onClick={ _ => _movePlayer(newPos.y, newPos.x)}
		/>
	)
}
const mapStateTopProps = ({config}) => {
	return { camera: config.cameraPos}
}

const mapDispatchToProps = dispatch => {
	return{
		_movePlayer : (y, x) => dispatch(setPlayerCoords({y,x}))
	}
}

export default connect(mapStateTopProps, mapDispatchToProps)(TileButton)