import React, {Component} from 'react'
import {connect} from 'react-redux'
import {setPlayerCoords} from '../redux/actions/config'
import {findPath} from '../functions/pathfinder2'


class DebuggingTools extends Component{
	state = {
		start: {},
		current: {},
		end: {},
	}

	componentDidMount(){
		const {playerPos, targetPos} = this.props.config
		this.setState(state => ({
			...state,
			start: playerPos,
			current: playerPos,
			end: targetPos,
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
		const {levels, config, _movePlayer} = this.props
		const level = levels[config.currentFloor].tiles
		const {handleUpdateCurrent} = this

		const start = config.playerPos
		const end = config.targetPos

		const lel = findPath(level, start, end)


		return(
			<div className="ui-debugger">
				<button onClick={ _ => handleUpdateCurrent(lel.destination)}>move</button>
				<div>{JSON.stringify(this.state.current)}</div>
				<div>{`total: ${JSON.stringify(lel.total)}`}</div>
				<div>{`origin: ${JSON.stringify(lel.origin)}`}</div>
				<div>{`destination: ${JSON.stringify(lel.destination)}`}</div>
			</div>
		)
	}
}

const mapStateToProps = ({levels, config}) =>{
	return {levels, config}
}

const mapDispatchToProps = dispatch => {
	return{
		_movePlayer: (obj) => dispatch(setPlayerCoords(obj))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DebuggingTools)