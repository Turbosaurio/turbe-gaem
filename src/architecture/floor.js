import React, {Component} from 'react';
import {rotateArr, rhombus} from '../arrays/arrays';
import Tile from './tile';

export default class Floor extends Component{
	render(){
		let 	tiles = [], counter = 0,
				floor = this.props.floorLevel,
				rotArr = rotateArr(floor),
				rohmArr = rhombus(floor.length);
		for(let i = 0; i < rotArr.length; i++){
			for(let k = 0; k < rotArr[i].length; k++){
				let 	y = rotArr[i][k][0],
						x = rotArr[i][k][1];
				let tileProperties = {
					key: counter,
					positionY: i,
					positionX: rohmArr[counter],
					textureNumber: floor[y][x]
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