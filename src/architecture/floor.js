import React, {Component} from 'react';
import {rotateArr, rhombus} from '../arrays/arrays';
import {floorOne, floorTwo} from '../levels/levels';
import Tile from './tile';

export default class Floor extends Component{
	render(){
		const floorNum = floorTwo;
		let tiles = [];
		let counter = 0;
		let 	rotated_floor = rotateArr(floorNum),
				rhombus_floor = rhombus(floorNum.length);
		//console.log(rotated_floor);
		for(let i = 0; i < rotated_floor.length; i++){
			for(let k = 0; k < rotated_floor[i].length; k++){
				let 	y = rotated_floor[i][k][0],
						x = rotated_floor[i][k][1];
				let tileProperties = {
					key: counter,
					positionY: i,
					positionX: rhombus_floor[counter],
					textureNumber: floorNum[y][x]
				}
				tiles.push(<Tile {...tileProperties}/>);
				counter++;
			}
		}
		return(
			<div className="floor">{tiles}</div>
		);
	}
}