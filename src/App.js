import React, { Component } from 'react';
import './App.css';

import Floor from './architecture/floor';

import {floorTwo} from './levels/levels';
import {isometricSkew, isometricX} from './arrays/arrays';


import {UICamera} from './ui/ui-camera';
import {rotateCamera} from './ui/camera-functions';

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
	_changeFloor(camera){
		let newLevel = rotateCamera(floorTwo, camera);
		this.setState({
			ui: 'rev',
			floors:{
				...this.state.floors,
				one:{
					floor: 2,
					floorLevel: newLevel,
					floorRot: isometricSkew(newLevel),
					floorRhom: isometricX(newLevel)
				}
			}
		})
	}
  render(){
		return (
			<div>
				<Floor {...this.state.floors.one}/>
				
				<UICamera
					cameraPosition={this.state.ui.cameraPosition}
					changeState={this.changeState}
				/>
				<div id="button_test">
					<button
						onClick={()=>{this._changeFloor('inv')}}
					>inv</button>
					<button
						onClick={()=>{this._changeFloor('ori')}}
					>ori</button>
					<button
						onClick={()=>{this._changeFloor('rot')}}
					>rot</button>
					<button
						onClick={()=>{this._changeFloor('rev')}}
					>rev</button>
				</div>
			</div>
    );
  }
}

export default App;
