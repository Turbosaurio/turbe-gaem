import React, { Component } from 'react';
import './App.css';

import Floor from './architecture/floor';

import {floorOne,floorTwo} from './levels/levels';
// import {rotateArr, rhombus} from './arrays/arrays';


import {UICamera} from './ui/ui-camera';
import {flipTile, flipLevel} from './ui/camera-functions';

class App extends Component{
	constructor(){
		super();
		this.state = {
			floors:{
				one:{
					floor: 1,
					floorLevel: floorOne,
				},
				two:{
					floor: 2,
					floorLevel: floorTwo,
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
		let {initialFloor} = this.state;
		return (
			<div>
				<Floor {...this.state.floors.one}/>
				<Floor {...this.state.floors.two}/>
				<UICamera
					cameraPosition={this.state.ui.cameraPosition}
					changeState={this.changeState}
				/>
				<button
					className="button-test" />
			</div>
    );
  }
}

export default App;
