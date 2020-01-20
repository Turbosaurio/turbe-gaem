import React, {Component} from 'react'
import {connect} from 'react-redux'
import {setConfigKey} from '../redux/actions/config'
import {getOpenNodes, minIndex} from '../functions/pathfinder2'


class MovementTools extends Component{
	state = {
		currentPosition: {},
		openNodes: {},
	}

	componentDidMount(){
		// this.setState(state => ({...state, currentPosition: this.props.playerPos}))
	}

	updateNewOpenNodes(nodes){
		this.setState({openNodes: nodes})
	}


	render(){
		const {currentPosition, openNodes} = this.state
		const {levels, config, _movePlayer} = this.props
		const {playerPos, targetPos} = config
		

		return(
			<div className="ui-debugger">
				<button onClick={ _ =>{
					const nodes = getOpenNodes(currentPosition, targetPos)
					this.updateNewOpenNodes(nodes)
				}}>update</button>
				<button onClick={ _ =>{
					// const lel = minIndex(nodes, 'destination')
					// return _movePlayer(lel)
					// return updateNewOpenNodes(nodes)
				}}>move</button>
			</div>
		)

	}
}

const mapStateToProps = ({levels, config}) =>{
	return {levels, config}
}

const mapDispatchToProps = dispatch => {
	return{
		_movePlayer: obj => dispatch(setConfigKey('playerPos', obj))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MovementTools)