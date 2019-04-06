import React, {Component} from 'react'
import {connect} from 'react-redux'
import {setPlayerCoords} from '../redux/actions/config'


class DebuggingTools extends Component{
	state = {
		start: {},
		current: {},
		end: {},
	}

	componentDidMount(){
		const {playerPos} = this.props.config
		this.setState(state => ({
			...state,
			start: playerPos,
			current: playerPos,
		}))
	}

	handleUpdateCurrent = obj =>{
		this.setState(state => ({
			...state,
			current: obj
		}))
		this.props._movePlayer(obj)
	}


	handleMovePlayer(...args){
		this.props._movePlayer(...args)
	}

	render(){
		const {_movePlayer} = this.props
		const {handleUpdateCurrent} = this
		return(
			<div className="ui-debugger">
				<button onClick={ _ => handleUpdateCurrent({y: 10, x: 10})}>uno</button>
				<div>{JSON.stringify(this.state.current)}</div>
			</div>
		)
	}
}

const mapStateToProps = ({config}) =>{
	return {config}
}

const mapDispatchToProps = dispatch => {
	return{
		_movePlayer: (obj) => dispatch(setPlayerCoords(obj))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DebuggingTools)