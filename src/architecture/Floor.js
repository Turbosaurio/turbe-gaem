import React from 'react'
import {connect} from 'react-redux'

import {rotateLevel} from '../functions/cameraFunctions'
import Tile from './Tile'
import TileButton from './TileButton'
import Player from '../player/Player'


function Floor({level, camera, floor, y, x}){
		let tilesGroup = [], tilesButtonsGroup = []
		const {tiles} = level
		const max = tiles.length
		const rotateTiles = rotateLevel(tiles, camera)
		for(let i = 0; i < max; i++){
			for(let k = 0; k < max; k++){
				const tilesProps = {
					// key: counter,
					y: i,
					x: k,
					top: k + i,
					left: k - i,
					texture: rotateTiles[i][k],
				}
				tilesGroup.push(<Tile key={`tile${k}_${i}`} {...tilesProps}/>)
				if(k!==x || i!==y){
					tilesButtonsGroup.push(<TileButton key={`tileButton${k}_${i}`} {...tilesProps}/>)
				}	
			}
		}

		return(
			<div className="floor" id={level.name}>
				{tilesGroup}
				{floor === 1 && <Player />}
				{floor === 1 && tilesButtonsGroup}
			</div>
		)
}

const mapStateToProps = ({config}) => {
	return { 
		camera: config.cameraPos,
		floor: config.floor,
		y: config.y,
		x: config.x,
	}
}

export default connect(mapStateToProps)(Floor)
