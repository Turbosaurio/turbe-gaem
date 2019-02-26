import React from 'react'
import {connect} from 'react-redux'

import {rotateLevel} from '../functions/cameraFunctions'
import Tile from './Tile'


function Floor({level, camera}){
		let counter = 0, tilesGroup = []
		const {tiles} = level
		const max = tiles.length
		const rotateTiles = rotateLevel(tiles, camera)
		for(let i = 0; i < max; i++){
			for(let k = 0; k < max; k++){
				const tilesProps = {
					key: counter,
					texture: rotateTiles[i][k],
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

const mapStateToProps = ({config}) => {
	return { camera: config.cameraPos}
}

export default connect(mapStateToProps)(Floor)