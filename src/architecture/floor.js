import React from 'react';
import Tile from './Tile';

export default function Floor({level}){
		let counter = 0, tilesGroup = []
		const {tiles} = level
		const max = tiles.length
		for(let i = 0; i < max; i++){
			for(let k = 0; k < max; k++){
				const tilesProps = {
					key: counter,
					texture: tiles[i][k],
					posY: counter % max + i,
					posX: k - i
				}
				tilesGroup.push(
					<Tile {...tilesProps}/>
				)
				counter++		
			}
		}

		return(
			<div className="floor" id={level.name}>{tilesGroup}</div>
		)
}