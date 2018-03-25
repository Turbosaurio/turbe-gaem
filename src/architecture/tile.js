import React, {Component} from 'react';
import {tileTexture} from './tile-textures';


export default class Tile extends Component	{
	_styleTileBackgroundUrl(textureNumber){
		return tileTexture(textureNumber).path;
	}
	_styleTileBackgroundPosition(textureNumber){
		return tileTexture(textureNumber).coord;
	}
	_styleTile(positionY, positionX, textureNumber){
			return{
				top: positionY * 35,
				left: positionX * 75,
				backgroundImage: this._styleTileBackgroundUrl(textureNumber),
				backgroundPosition: this._styleTileBackgroundPosition(textureNumber)
			}
	}
	render(){
		let {positionY, positionX, textureNumber} = this.props;
		return(
			<div
				className="tile"
				style={this._styleTile(positionY, positionX, textureNumber)}
			>{textureNumber}
			</div>
		);
	}
}