import React from 'react'
import {connect} from 'react-redux'
import {createUseStyles} from 'react-jss'
import { PORT } from '../constants'
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
	const ty = parseInt( 19 - y, 2)
	const tx = parseInt( 19 - x, 2)
	switch(cam){

		case "rot": return {y: tx, x: y}
		case "rev": return {y: x, x: ty}

		case "inv": return {y: ty, x: tx}
		default: return { y, x }
	}
}


const TileButton = ({top, left, y, x, cameraPos, _handeMovePlayer, level, player}) => {
	const jss = tileButtonStyles()
	const newPosition = rotateCoords(y,x, cameraPos)
	return(
		<button
			style={{top: top * 35 + 219, left: left * 75 + 26}}
			title={`${y}_${x}`}
			className={jss.tile_button}
			onClick={ _ => { 
				_handeMovePlayer({
					id: player,
					...rotateCoords(y, x, cameraPos)
				})
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
	const postOptions = {
		method: 'POST',
		headers:{
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	}
	return{
		_handeMovePlayer: body => {
			fetch(`${PORT}/api/players/set_player_position`, { ...postOptions, body: JSON.stringify(body)})
				.then( data => data.json())
				.then( res => {
					if (res.success) dispatch(movePlayer(res.results))
				})
				.catch( err => console.log(err))
		}
	}
}

export default connect(mapStateTopProps, mapDispatchToProps)(TileButton)