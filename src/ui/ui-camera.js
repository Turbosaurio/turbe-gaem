import React, {Component} from "react";
import {rotateCamera} from './camera-functions';
import {isometricSkew, isometricX} from '../arrays/arrays';

export class UICamera extends Component{
	_UIRotateCamera(value, camera, direction){
		let {changeState} = this.props;
		let {cam, arr} = rotateCamera(camera, value, direction);
		changeState(value, (state, value) =>{
			let obj = state.ui.cameraPosition = cam;
			return obj;
		})
		changeState(value, (state, value) => {
			let obj = state.floors.one = {
				floorLevel: arr,
				floorRot: isometricSkew(arr),
				floorRhom: isometricX(arr),
			}
			return obj;
		});
	}

	render(){
		let {level, cameraPosition} = this.props;
		return(
			<div className="ui-buttons-container">
				<div>{this.props.cameraPosition}</div>
				<button onClick={() =>{
					this._UIRotateCamera(level.floorLevel, cameraPosition, "right")
				}
				}>right</button>
				<button onClick={() =>{
					this._UIRotateCamera(level.floorLevel, cameraPosition, "left")
				}
				}>left</button>
			</div>
		);
	}
}

	