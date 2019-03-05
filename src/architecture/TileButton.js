import React from 'react'
import {connect} from 'react-redux'
import {setPlayerCoords} from '../redux/actions/config'
import {rotatePlayer} from '../functions/cameraFunctions'
import {findPath} from '../functions/pathfinder2' 

const _findPath = (map, start, end) =>{
	findPath(map, start, end)
}

function TileButton ({top, left, y, x, config, _movePlayer, level}){
	const {cameraPos, floorSize, playerPos} = config
	const newPos = rotatePlayer(y, x, cameraPos, floorSize)
	return(
		<button
			style={{top: top * 35 + 219, left: left * 75 + 26}}
			title={`${y}_${x}`}
			className="tile-button"
			onClick={ _ => 
				_findPath(level, playerPos, {y: newPos.y, x: newPos.x})
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
		_movePlayer : ({y, x}) => dispatch(setPlayerCoords({y,x})),
	}
}

export default connect(mapStateTopProps, mapDispatchToProps)(TileButton)