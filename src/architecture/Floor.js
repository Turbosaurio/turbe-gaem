import React from 'react'
import {createUseStyles} from 'react-jss'
import {connect} from 'react-redux'

import {rotateLevel} from '../functions/cameraFunctions'
import Tile from './Tile'
import TileButton from './TileButton'
import Player2 from '../player/Player2'


const floorStyles = createUseStyles({
	floor:{
		position: 'relative',
		left: 1421
	}
})


const Floor = ({level, config, players}) =>{
	let tilesGroup = [], tilesButtonsGroup = []
	const {tiles} = level
	const max = tiles.length
	const {floor, cameraPos, playerPos} = config
	const {y,x} = playerPos
	const rotateTiles = rotateLevel(tiles, cameraPos)

	const jss = floorStyles()
	
	for(let i = 0; i < max; i++){
		for(let k = 0; k < max; k++){
			const texture = rotateTiles[i][k]
			const tilesProps = {
				// key: counter,
				y: i,
				x: k,
				top: k + i,
				left: k - i,
				texture
			}
			tilesGroup.push(<Tile key={`tile${k}_${i}`} {...tilesProps}/>)
			if(k!==x || i!==y){
				tilesButtonsGroup.push(<TileButton key={`tileButton${k}_${i}`} {...tilesProps}/>)
			}	
		}
	}

	return(
		<div className={jss.floor} id={level.name}>
			{tilesGroup}
			{floor === 1 && 

				players.map( player => 
					<Player2
						key={player.name}
						name={player.name}
						position={player.position}
						face={player.face}
					/>
				)
			}
			{/*floor === 1 && tilesButtonsGroup*/}
		</div>
	)
}

const mapStateToProps = ({config, players}) => {
	return {config, players}
}

export default connect(mapStateToProps)(Floor)
