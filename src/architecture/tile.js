import React from 'react'
import {connect} from 'react-redux'

const tileTexture = num =>{
	const columns = 4,
				rows = 5,
				perPage = 20,
				x = 150, ////////////sprite width
				y = 300; //////////sprite height
	
	const	a = num % columns,
			bg_pos_x = a * x * -1,
			bg_pos_y = Math.floor( (num-1) / columns ) % rows * y * -1;

	return {
		backgroundImage: `url(/textures/tiles${Math.floor((num-1)/perPage)}.png)`, 
		backgroundPosition: `${bg_pos_x}px ${bg_pos_y}px`
	}
}

const textureCamera = (cam, val) => {
	switch(cam){
		case 'rot':
			return val % 4 === 0 ? -3 : +1
		case 'rev':
			return val % 4 === 1 ? +3 : -1
		case 'inv':
			return val % 4 === 0 || val % 4 === 3 ? -2 : +2
		case 'ori': return 0
		default: return 0
	}
}

const Tile = ({texture, posY, posX, camera}) => {
	const uno = textureCamera(camera, texture)
	const {path, coord} = tileTexture(texture)
	return(
		<div
			className='tile'
			style={{
				...tileTexture(texture),
				top: posY * 35,
				left: posX * 75,
			}}
		>{`${texture}:${texture + uno}`}
		</div>
	)
}

const mapStateToProps = ({config}) => {
	return { camera:  config.cameraPos}
}

export default connect(mapStateToProps)(Tile)