import React, {Component} from 'react'
import {connect} from 'react-redux'

import {setConfigKey} from '../redux/actions/config'

class Player extends Component{
	
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
		const {face, x, y} = this.props.config
		const playerStyles = {
			backgroundImage : 'url(player/player.png)',
			...this.getFace(face),
			top: `${(y + x) * 35}px`,
			left: `${(x - y) * 75}px`
		}

		return(
			<div
				className="player"
				style={playerStyles}
			>
				<div>{`face ${face}`}</div>
				<div>{`coords ${y},${x}`}</div>
			</div>
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