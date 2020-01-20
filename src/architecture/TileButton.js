import React from 'react'
import {createUseStyles} from 'react-jss'
import {connect} from 'react-redux'
import {setConfigKey} from '../redux/actions/config'
import {rotatePlayer} from '../functions/cameraFunctions'


const tileButtonStyles = createUseStyles({
	tile_button:{
		position: 'absolute',
		display: 'block',
		width: 98,
		height: 50,
		border: 'none',
		backgroundColor: 'black',
		borderRadius: '50%',
		opacity: 0,
		'&:hover':{
			opacity: .25,
		}
	}
})


const TileButton = ({top, left, y, x, config, _setConfigKey, level}) => {
	const {cameraPos, floorSize, playerPos} = config
	const newPos = rotatePlayer(y, x, cameraPos, floorSize)
	const targetPos = {y: newPos.y, x: newPos.x}
	const jss = tileButtonStyles()
	return(
		<button
			style={{top: top * 35 + 219, left: left * 75 + 26}}
			title={`${y}_${x}`}
			className={jss.tile_button}
			onClick={ _ => {
				_setConfigKey('targetPos', targetPos)
			}}
		/>
	)
}
const mapStateTopProps = ({config, levels}) => {
	return {
		config,
		level: levels[config.currentFloor].tiles
	}
}

const mapDispatchToProps = dispatch => {
	return{
		_setConfigKey : (key, data) => dispatch(setConfigKey({key, data}))
	}
}

export default connect(mapStateTopProps, mapDispatchToProps)(TileButton)