import React from 'react'
import {connect} from 'react-redux'
import {createUseStyles} from 'react-jss'

import axios from 'axios'

import { movePlayer } from '../redux/actions/players'
import { rotatePlayer } from '../functions/cameraFunctions'


const tileButtonStyles = createUseStyles({
	tile_button:{
		position: 'absolute',
		display: 'block',
		width: 98,
		height: 50,
		border: '1px solid white',
		backgroundColor: 'transparent',
		borderRadius: '50%',
		opacity: 0,
		'&:hover':{
			opacity: 1,
		}
	}
})


const TileButton = ({top, left, y, x, config, _movePlayer, level}) => {
	const {cameraPos, floorSize, playerPos} = config
	const newPos = rotatePlayer(y, x, cameraPos, floorSize)
	const targetPos = {y: newPos.y, x: newPos.x}
	const jss = tileButtonStyles()
	return(
		<button
			style={{top: top * 35 + 219, left: left * 75 + 26}}
			title={`${y}_${x}`}
			className={jss.tile_button}
			onClick={ _ => {
				// _setConfigKey('targetPos', targetPos)
				_movePlayer({y, x})
			}}
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
		_movePlayer : async target => {
			const body = {
				"id": "5e3cb842fbd024400461b8dd",
				"y": target.y,
				"x": target.x,
			}
			await axios({
				headers: { "Content-Type" : "application/json" },
				baseURL: "http://localhost:5000/api/player_position",
				method: "post",
				data: body,
			})
			await dispatch(movePlayer(body))
				
		}
	}
}

export default connect(mapStateTopProps, mapDispatchToProps)(TileButton)