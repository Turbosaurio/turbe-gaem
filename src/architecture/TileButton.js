import React from 'react'
import {connect} from 'react-redux'
import {setTargetCoords} from '../redux/actions/config'
import {rotatePlayer} from '../functions/cameraFunctions'
import {findPath} from '../functions/pathfinder2' 


function TileButton ({top, left, y, x, config, _setTargetPosition, level}){
	const {cameraPos, floorSize, playerPos} = config
	const newPos = rotatePlayer(y, x, cameraPos, floorSize)
	return(
		<button
			style={{top: top * 35 + 219, left: left * 75 + 26}}
			title={`${y}_${x}`}
			className="tile-button"
			onClick={ _ => 
				_setTargetPosition({y: newPos.y, x: newPos.x})
			}
		/>
	)
}
const mapStateTopProps = ({config, levels}) => {
	return {
		config,
		level: levels[config.currentFloor].tiles
	}
}

const mapDispatchToProps = dispatch => {
	return{
		_setTargetPosition : obj => dispatch(setTargetCoords(obj)),
	}
}

export default connect(mapStateTopProps, mapDispatchToProps)(TileButton)