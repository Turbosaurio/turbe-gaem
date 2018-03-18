import React, { Component } from 'react';
import './App.css';

import Floor from './architecture/floor';
import {floorOne,floorTwo} from './levels/levels';
import {UICamera} from './ui/ui-camera';
import {flipTile, flipLevel} from './ui/camera-functions';

class App extends Component{
	constructor(){
		super();
		this.state = {
			cameraPosition: "ori",
			initialFloor: floorOne,
			cameraFloor: this._cameraFloor(flipLevel(floorOne, "inv"), "inv"),
		}
		this.changeState = this.changeState.bind(this);
	}
	_cameraFloor(level, cam){
		let arr = level;
		for(let i = 0; i < level.length; i++){
			for(let k = 0; k < level[i].length; k++){
				arr[i][k] += flipTile(cam, level[i][k]);
			}
		}
		return arr;
	}
	changeState(keyValue, fun){
		let obj = fun(this.state, keyValue);
		this.setState({obj});
	}
  render() {
	const {cameraFloor} = this.state;
	return (
		<div>
			<Floor floorNumber={cameraFloor}/>
			<UICamera
				cameraPosition={this.state.cameraPosition}
				changeState={this.changeState}
			/>
		</div>
    );
  }
}

export default App;
