import React, {Component} from 'react';
import Tile from './tile';



export default class Floor extends Component{
	render(){
		// let 	tiles = [], counter = 0,
		// 		floor = this.props.floorLevel,
		// 		rotArr = rotateArr(floor),
		// 		rohmArr = rhombus(floor.length);
		let counter = 0, tiles = [];
		let {floorLevel, floorRot, floorRhom} = this.props;
		for(let i = 0; i < floorRot.length; i++){
			for(let k = 0; k < floorRot[i].length; k++){
				let 	y = floorRot[i][k][0],
						x = floorRot[i][k][1];
				let tileProperties = {
					key: counter,
					positionY: i,
					positionX: floorRhom[counter],
					textureNumber: floorLevel[y][x]
				}
				tiles.push(<Tile {...tileProperties}/>);
				counter++;
			}
		}
		return(
			<div className="floor" id={`floor_${this.props.floor}`}>{tiles}</div>
		);
	}
}