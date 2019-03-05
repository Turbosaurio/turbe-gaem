import React, {Component} from 'react'
import {connect} from 'react-redux'

import {setConfigKey} from '../redux/actions/config'
import {rotatePlayer} from '../functions/cameraFunctions'

class Player extends Component{
	
	cameraFace(cam, face){
		switch(cam){
			case 'ori':
				return face
			case 'rot':
				return face + 2 > 7 ? (face + 2) % 7 - 1 : face + 2
			case 'inv':
				return face + 4 > 7 ? (face + 4) % 7 - 1 : face + 4
			case 'rev':
				return face + 6 > 7 ? (face + 6) % 7 - 1 : face + 6
			default: return face
		}
	}

	getFace(num){
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


	render(){
		const {cameraPos, face, playerPos, floorSize} = this.props.config
		const {y, x} = playerPos
		const newPos = rotatePlayer(y,x,cameraPos, floorSize)
		const playerStyles = {
			...this.getFace(this.cameraFace(cameraPos, face)),
			backgroundImage : 'url(player/player.png)',
			top: `${(newPos.y + newPos.x) * 35}px`,
			left: `${(newPos.x - newPos.y) * 75}px`
		}

		return(
			<div
				className="player"
				style={playerStyles}
			/>
		)
	}
}

const mapStateToProps =({config})=>{
	return {config}
}

const mapDispatchToProps = dispatch => {
	return {
		_changeFace: (data, extra) => {
			const newData = _ => {
				let temp = data + extra
				if(temp > 7) temp = 0
				if(temp < 0) temp = 7
				return temp
			}
			dispatch(setConfigKey({key: 'face', data: newData()}))
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Player)