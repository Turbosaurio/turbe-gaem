import React, {Component} from 'react';
import {tileTexture} from './tile-textures';


export default class Tile extends Component	{
	constructor(props){
		super(props);
		let {positionY, positionX, textureNumber} = this.props;
		this.changeState = this._changeState.bind(this);
		this.state ={
			tileNumber: textureNumber,
			tileStyle: this._styleTile(positionY, positionX, textureNumber)
		}
	}

	_changeState(keyValue, fun){
		let objeto = fun(this.state, keyValue);
		this.setState({objeto});
	}

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
		return(
			<div
				className="tile"
				style={this.state.tileStyle}
			>
			
			</div>
		);
	}
}