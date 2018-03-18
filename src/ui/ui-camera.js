import React, {Component} from "react";

export class UICamera extends Component{
	constructor(){
		super();
	}
	_flipCameraLeft(camera,direction){
		let to_cam;
		switch(direction){
			case "right":
				switch(camera){
					case 'ori': to_cam="rot"; break;
					case 'rot': to_cam="inv"; break;
					case 'inv': to_cam="rev"; break;
					case 'rev': to_cam="ori"; break;		
				}break;
			case "left":
				switch(camera){
					case 'ori': to_cam='rev'; break;
					case 'rev': to_cam='inv'; break;
					case 'inv': to_cam='rot'; break;
					case 'rot': to_cam='ori'; break;
				}break;
			default: break;
		}
		this.props.changeState(to_cam, (state, to_cam) =>{
			let obj = state.ui.cameraPosition = to_cam;
			return obj;
		});
	}
	_buttonTurn(direction){
		let to_cam = this._flipCameraLeft(this.props.cameraPosition, direction);
	}
	render(){
		return(
			<div className="ui-buttons-container">
				<div>{this.props.cameraPosition}</div>
				<button onClick={ () => {
					this._buttonTurn('left');
				}}>Left</button>
				<button onClick={ () => {
					this._buttonTurn('right');
				}}>Right</button>
			</div>
		);
	}
}