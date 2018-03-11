import React, {Component} from 'react';

export default class Tile extends Component	{
	constructor(){
		super();
		this.state ={
			texture: 1
		};
	}
	_positionTile(y,x){
		let 	top = y * 30,
				left = x * 30;
		return{
			top: top,
			left: left + 600
		}
	}
	render(){
		let {tileName, posY, posX}  = this.props;
		return(
			<div
					className="tile"
					id={tileName}
					style={this._positionTile(posY, posX)}
			>{this.props.content}</div>
		);
	}
}