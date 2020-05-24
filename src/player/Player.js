import React from 'react'
import { connect } from 'react-redux'
import { createUseStyles } from 'react-jss'

import { PORT } from '../constants'
import SubscribeChannel from '../functions/SubscribeChannel'
import { rotatePlayer } from '../functions/cameraFunctions'
import { movePlayer } from '../redux/actions/players'


function cameraFace(cam, face){
	switch(cam){
		case 'rot':
			return face + 2 > 7 ? (face + 2) % 7 - 1 : face + 2
		case 'inv':
			return face + 4 > 7 ? (face + 4) % 7 - 1 : face + 4
		case 'rev':
			return face + 6 > 7 ? (face + 6) % 7 - 1 : face + 6
			
		case 'ori':
		default: return face
	}
}

function getFace(num){
	let x = 0, y = 0
	switch(num){
		case 0:
			break
		case 1:
			y = 1
			break
		case 2:
			x = 5
			break
		case 3:
			x = 5
			y = 2
			break
		case 4:
			y = 3
			x = 5
			break
		case 5:
			y = 1
			x = 5
			break
		case 6:
			y = 3
			break
		case 7:
			y = 2
			break
		default: break
	}
	return {backgroundPosition: `${x* -150}px ${y* -300}px`}
}

const playerStyle = createUseStyles ({
	player: {
		position: 'absolute',
		width: props => props.width,
		height: props => props.height,
		backgroundRepeat: 'no-repeat'
	}
})

const Player = ({ name, position, face, cameraPos, _id, updatePlayerPosition }) => {	
	const { y, x } = position

	const newPos = rotatePlayer(y,x,cameraPos, 19)

	const jss = playerStyle({
		width: 150,
		height: 300,
	})

	const playerPosition = {
		...getFace(cameraFace(cameraPos, face)),
		backgroundImage : `url(../player/${name}.png)`,
		top: `${(newPos.y + newPos.x) * 35}px`,
		left: `${(newPos.x - newPos.y) * 75}px`
	}

	return(
			<div
				className={ jss.player }
				style={ playerPosition }
			>
				<SubscribeChannel channel="players" method="updated" callback={ _ => updatePlayerPosition(_id) } />
			</div>
	)
}

const mapStateToProps =({config})=> ({ cameraPos: config.cameraPos})

const mapDispatchToProps = dispatch => ({
	updatePlayerPosition: id => {
		console.log('player moved')
		fetch(`${PORT}/api/players/get_player?playerId=${id}`)
			.then( data => data.json())
			.then( res => {
				if( res.success ) dispatch(movePlayer({
						id, ...res.data.position
				}))
			})
			.catch( err => console.log(err))

	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Player)