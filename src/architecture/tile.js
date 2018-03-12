import React, {Component} from 'react';
import {tileTexture} from './tile-textures';


export default class Tile extends Component	{
	constructor(){
		super();
		this.state ={
			backgroundPosition: ""
		};
	}
	styleTile(positionY, positionX, textureNumber){
		let 	top = positionY * 35,
				left = positionX * 75;
		return{
			top: top,
			left: left + 800,
			backgroundImage: tileTexture(textureNumber).path,
			backgroundPosition: tileTexture(textureNumber).coord
		}
	}
	render(){
		let {positionY, positionX, textureNumber}  = this.props;
		return(
			<div
					className="tile"
					style={ this.styleTile(positionY, positionX, textureNumber) }
			/>
		);
	}
}