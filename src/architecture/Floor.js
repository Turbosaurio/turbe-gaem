import React from 'react'
import {connect} from 'react-redux'

import {rotateLevel} from '../functions/cameraFunctions'
import Tile from './Tile'
import TileButton from './TileButton'
import Player from '../player/Player'


function Floor({level, camera, floor, y, x}){
		let counter = 0, tilesGroup = [], tilesButtonsGroup = []
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
				tilesGroup.push(<Tile {...tilesProps}/>)
				if (i !== y && k !== x){
					tilesButtonsGroup.push(<TileButton {...tilesProps}/>)
				}
				counter++		
			}
		}

		return(
			<div className="floor" id={level.name}>
				{tilesGroup}
				{floor === 1 && tilesButtonsGroup}
				{floor === 1 && <Player />}
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
