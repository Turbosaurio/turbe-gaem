import React, { Component } from 'react';
import './App.css';

import Floor from './architecture/floor';

import {floorTwo} from './levels/levels';
import {isometricSkew, isometricX} from './arrays/arrays';
import {UICamera} from './ui/ui-camera';

class App extends Component{
	constructor(){
		super();
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
		this.changeState = this.changeState.bind(this);
	}
	changeState(keyValue, fun){
		let obj = fun(this.state, keyValue);
		this.setState({obj});
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
    );
  }
}

export default App;
