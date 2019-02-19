import React, { Component } from 'react'
import './App.css'

import Floor from './architecture/floor'

import {connect} from 'react-redux'
import {handleLevelsData} from './redux/actions/shared'

import {floorTwo} from './levels/levels'
import {isometricSkew, isometricX} from './arrays/arrays'
import {UICamera} from './ui/ui-camera'

class App extends Component{
	constructor(){
		super()
		this.state = {
			floors:{
				one:{
					floor: 1,
					floorLevel: floorTwo,
					floorRot: isometricSkew(floorTwo),
					floorRhom: isometricX(floorTwo),
				},
			},
			ui:{
				cameraPosition: "ori",
				initialFloor: "one",
			},
		}
		this.changeState = this.changeState.bind(this)
	}

	componentDidMount(){
		this.props.dispatch(handleLevelsData())
	}
	changeState(keyValue, fun){
		let kek = fun(this.state, keyValue)
		this.setState({kek})
	}
  render(){
		return (
			<div>
				<Floor {...this.state.floors.one}/>
				<UICamera
					level={this.state.floors.one}
					cameraPosition={this.state.ui.cameraPosition}
					changeState={this.changeState}
				/>
			</div>
    )
  }
}

const mapStateToProps = ({levels, finish}) => {
	return { levels, finish}
}

export default connect(mapStateToProps)(App)
