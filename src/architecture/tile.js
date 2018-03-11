import React, {Component} from 'react';
export default class Tile extends Component	{
	constructor(){
		super();
		this.state ={
			backgroundPosition: ""
		};
	}
	_positionTile(y,x){
		let 	top = y * 150,
				left = x * 150;

		let {img_path, img_top, img_left} = this.props.tileTexture;
		return{
			top: top,
			left: left + 800,
			background:{
				position:{
					top: img_top,
					left: img_left
				},
				image: "url("+img_path+")"
			}
		}
	}
	render(){
		let {tileName, posY, posX}  = this.props;
		return(
			<div
					className="tile"
					id={tileName}
					style={ this._positionTile(posY, posX) }
			>{this.props.content}</div>
		);
	}
}