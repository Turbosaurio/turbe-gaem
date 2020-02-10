import React from 'react'
import {connect} from 'react-redux'
import {createUseStyles} from 'react-jss'

import axios from 'axios'

import { movePlayer } from '../redux/actions/players'

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

export const rotateCoords = ( y, x, cam ) =>{
	const ty = parseInt( 19 - y)
	const tx = parseInt( 19 - x)
	switch(cam){

		case "rot": return {y: tx, x: y}
		case "rev": return {y: x, x: ty}

		case "inv": return {y: ty, x: tx}
		default: return { y, x }
	}
}


const TileButton = ({top, left, y, x, cameraPos, _movePlayer, level, player}) => {
	const jss = tileButtonStyles()
	return(
		<button
			style={{top: top * 35 + 219, left: left * 75 + 26}}
			title={`${y}_${x}`}
			className={jss.tile_button}
			onClick={ _ => {
				_movePlayer(player, rotateCoords(y, x, cameraPos))
			}}
		/>
	)
}
const mapStateTopProps = ({config, levels}) => {
	return {
		player: config.selectedPlayer,
		cameraPos: config.cameraPos,
		level: levels[config.currentFloor].tiles
	}
}

const mapDispatchToProps = dispatch => {
	return{
		_movePlayer : async (player, target) => {
			const body = {
				"id": player,
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