import React, { Component, Fragment } from 'react'
import './App.css'

import Floor from './architecture/Floor2'

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
  	const {levels, finish} = this.props
  	const {level1, level2} = levels
		return (
			<div>
				{
					finish === 'done' &&
					<Fragment>
						<Floor 
							floor={1}
							floorLevel={level1}
							floorRot={isometricSkew(level1)}
							floorRhom={isometricX(level1)}
						/>
						<Floor 
							floor={2}
							floorLevel={level2}
							floorRot={isometricSkew(level2)}
							floorRhom={isometricX(level2)}
						/>
						<UICamera
							level={2}
							cameraPosition={'ori'}
							
						/>
					</Fragment>
				}
			</div>
    )
  }
}

const mapStateToProps = ({levels, finish}) => {
	return { levels, finish}
}

export default connect(mapStateToProps)(App)
