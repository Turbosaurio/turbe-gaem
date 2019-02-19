import React from 'react'
import Tile from './tile'

const Floor = ({floor, floorLevel, floorRot, floorRhom}) =>{
	let counter = 0
	const tiles = []
	for(let i = 0; i < floorRot.length; i++){
		for(let k = 0; k < floorRot[i].length; k++){
			const y = floorRot[i][k][0], x = floorRot[i][k][1]
			const tileProperties = {
				key: counter,
				positionY: i,
				positionX: floorRhom[counter],
				textureNumber: floorLevel[y][x]
			}
			tiles.push(<Tile {...tileProperties}/>)
			counter++
		}	
	}
	return(
		<div
			style={{top: 225 * floor * -1 + 500}}
			className="floor"
			id={`floor_${floor}`}
		>{tiles}</div>
	)
}

export default Floor