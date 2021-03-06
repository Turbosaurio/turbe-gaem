import React from 'react'
import {createUseStyles} from 'react-jss'
import {connect} from 'react-redux'

import {rotateLevel} from '../functions/cameraFunctions'
import Tile from './Tile'
import TileButton from './TileButton'
import Players from '../player/Players'


const floorStyles = createUseStyles({
	floor:{
		position: 'relative',
		left: 1421,
		top: props => props.position * -224
	}
})


const Floor = ({config, level, levels}) =>{

	let tilesGroup = [], tilesButtonsGroup = []

	const {tiles} = levels[`level${level}`]
	const max = tiles.length
	const {currentFloor, floor, cameraPos} = config
	// const {y,x} = playerPos
	const rotateTiles = rotateLevel(tiles, cameraPos)

	const jss = floorStyles({ position: level })
	
	for(let i = 0; i < max; i++){
		for(let k = 0; k < max; k++){
			const texture = rotateTiles[i][k]
			const tilesProps = {
				y: i,
				x: k,
				top: k + i,
				left: k - i,
				texture
			}
			tilesGroup.push(<Tile key={`tile${k}_${i}`} {...tilesProps}/>)
			tilesButtonsGroup.push(<TileButton key={`tileButton${k}_${i}`} {...tilesProps}/>)
		}
	}

	return(
		<div className={jss.floor} id={level.name}>
			{tilesGroup}
			{tilesButtonsGroup}
			<Players />
		</div>
	)
}

const mapStateToProps = ({config, levels}) => {
	return {config, levels}
}

export default connect(mapStateToProps)(Floor)
