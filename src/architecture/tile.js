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
	_rotateTile(dir, val){
		let currentTile = this.state.tileNumber;
		switch(dir){
			case "L":
				this.setState({tileNumber: currentTile + 4});
				break;
			case "R":
				this.setState({tileNumber: currentTile - 4});
				break;
		}
	}
	render(){
		return(
			<div
					className="tile"
					style={this.state.tileStyle}
			>{this.state.tileNumber}
				<button
					className="tile-button l"
					onClick={()=>{this._rotateTile("L",5); }}
					>L</button>
				<button
					className="tile-button r"
					onClick={()=>{this._rotateTile("R",5); }}
					>R</button>
			</div>
		);
	}
}