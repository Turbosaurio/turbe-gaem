import React from 'react'
import {createUseStyles} from 'react-jss'
import {connect} from 'react-redux'
import {onlyRotable} from '../functions/cameraFunctions'

const tileTexture = ( num, height, width ) =>{

	const rows = 5, columns = 4, perPage = 20

	const top = Math.floor(num / columns ) % rows
	const left = num % columns
	const page = Math.floor( num / perPage)

	const backgroundImage = `url(../textures/tiles${page}.png`
	const backgroundPosition = `-${left * width}px -${top * height}px`

	return {
		backgroundImage,
		backgroundPosition
	}
}

const tileStyle = createUseStyles({
	tile:{
		position: 'absolute',
		height: props => props.height,
		width: props => props.width,
		backgroundRepeat: 'no-repeat',
	},
})


const textureCamera = (cam, val) => {
	switch(cam){
		case 'rot':
			return val % 4 === 0 ? -3 : 1
		case 'rev':
			return val % 4 === 1 ? 3 : -1
		case 'inv':
			return val % 4 === 0 || val % 4 === 3 ? -2 : 2
		case 'ori': return 0
		default: return 0
	}
}

const Tile = ({texture, top, left, camera}) => {

	const newTexture = onlyRotable(texture) ? texture + textureCamera(camera, texture) : texture
	const height = 300, width = 150
	const jss = tileStyle({ height, width})

	return(
		<div
			className={jss.tile}
			style={{
				...tileTexture(newTexture, height, width),
				top: top * 35,
				left: left * 75,
			}}
		>
		</div>
	)
}

const mapStateToProps = ({config}) => {
	return { camera:  config.cameraPos}
}

export default connect(mapStateToProps)(Tile)