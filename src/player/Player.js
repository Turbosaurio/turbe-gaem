import React, {Component} from 'react'
import {connect} from 'react-redux'

import {setConfigKey} from '../redux/actions/config'

class Player extends Component{

	constructProp(num1, num2){
		return {
			backgroundPosition: `${num1* -150}px ${num2* -300}px`
		}	
	}

	getPosition(num){
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
				y = 2
				break
			case 4:
				x = 5
				break
			case 5:
				y = 3
				break
			case 6:
				x = 5
				y = 1
				break
			case 7:
				x = 5
				y = 3
				break
			default: break
		}
		return this.constructProp(x, y)
	}

	render(){
		const {config} = this.props
		return(
			<div
				className="player"
				style={this.getPosition(config.face)}
			>
			<button onClick={ _ => this.props._changePosition(config.face, +1)}/>
			<button onClick={ _ => this.props._changePosition(config.face, -1)}/>
			{config.face}
			</div>
		)
	}
}

const mapStateToProps =({config})=>{
	return {config}
}

const mapDispatchToProps = dispatch => {
	return {
		_changePosition: (data, extra) => {
			const newData = _ => {
				let temp = data + extra
				if(temp > 7) temp = 0
				if(temp < 0) temp = 7
				return temp
			}
			dispatch(setConfigKey({key: 'face', data: newData()}))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Player)