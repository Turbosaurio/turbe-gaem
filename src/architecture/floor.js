import React, {Component} from 'react';
import {rotateArr, rhombus} from '../arrays/arrays';
import {floorOne} from '../levels/levels';
import Tile from './tile';

export default class Floor extends Component{
	render(){
		let tiles = [];
		let counter = 0;
		let rotated_floor = rotateArr(floorOne),
			position = rhombus(floorOne.length);
		
		for(let i = 0; i < rotated_floor.length; i++){
			for(let k = 0; k < rotated_floor[i].length; k++){
				let 	y = rotated_floor[i][k][0],
						x = rotated_floor[i][k][1];
				console.log(position[counter]);
				tiles.push(
					<Tile
						key={counter}
						tileName={`${1}_${y}_${x}`}
						posY={i}
						posX={position[counter]}
						content={rhombus[k]}
					/>
				);
				counter++;
			}
		}
		return(
			<div className="floor">{tiles}</div>
		);
	}
}