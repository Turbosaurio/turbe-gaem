import React, {Component} from 'react';
import {tileTexture} from './tile-textures';


export default class Tile extends Component	{
	_styleTile(positionY, positionX, textureNumber){
		let 	top = positionY * 35,
				left = positionX * 75;
		return{
			top: top,
			left: left,
			backgroundImage: tileTexture(textureNumber).path,
			backgroundPosition: tileTexture(textureNumber).coord
		}
	}
	constructor(props){
		super(props);
		let {positionY, positionX, textureNumber} = this.props;
		this.state ={
			tileStyle: this._styleTile(positionY, positionX, textureNumber)
		}
	}
	render(){
		return(
			<div
					className="tile"
					style={this.state.tileStyle}
			/>
		);
	}
}