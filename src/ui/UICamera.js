import React, {useCallback} from "react"
import {connect} from 'react-redux'
import {setConfigKey} from '../redux/actions/config'
import {useEventListener} from '../functions/useEventListener'

const UICamera = ({config, currentLevel, _setCamera, _movePlayer}) =>{

	const {playerPos, levelSize} = config

	useEventListener('keypress', useCallback(
		({keyCode}) => {
			switch(keyCode){
				case 119 : return moveSelected('up')
				case 97 : return moveSelected('left')
				case 115 : return moveSelected('down')
				case 100 : return moveSelected('right')
				default : return null
			}	
		}
	))

	const moveSelected = direction =>{
		const {y, x} = playerPos
		let target
		switch(direction){
			case 'up': return handleSelected('y', -1)
			case 'left': return handleSelected('x', -1)
			case 'down': return handleSelected('y', 1)
			case 'right': return handleSelected('x', 1)
			default: return null
		}
	}

	const handleSelected = (key, val) => {
		_movePlayer({...playerPos, [key]: playerPos[key] + val })	
	}

	const handleRotation = (dir, cam) =>{
		if(dir === 'left'){
			switch(cam){
				case 'ori' : return ('rot')
				case 'rot' : return ('inv')
				case 'inv' : return ('rev')
				case 'rev' : return ('ori')
				default: return cam
			}
		} else {
			switch(cam){
				case 'ori' : return ('rev')
				case 'rev' : return ('inv')
				case 'inv' : return ('rot')
				case 'rot' : return ('ori')
				default: return cam
			}
		}
	}

	const handleCameraChange = (dir, cam) =>{ 
		_setCamera(handleRotation(dir, cam))
	}
	const {cameraPos} = config

	const style = {
		backgroundImage: "url('ui-images/rotate-arrow.svg')"
	}

	return(
		<div className="ui-buttons-container">
			<button style={style} onClick={_ => handleCameraChange('left', cameraPos)}>left</button>
			<button style={style} onClick={_ => handleCameraChange('right', cameraPos)}>right</button>
			{
				Object.keys(config).map( d => {
					const div = config[d]
					return <div key={d}>{`${d}:`}<span>{JSON.stringify(div)}</span></div>
					}
				)
			}
		</div>
	)
}


const mapStateToProps = ({levels, config}) => ({
	config,
	currentLevel: levels[config.currentFloor].tiles
})

const mapDispatchToProps = dispatch => ({
	_setCamera: data => dispatch(setConfigKey({key: 'cameraPos', data})),
	_movePlayer: data => dispatch(setConfigKey({key: 'playerPos', data})),
})

export default connect(mapStateToProps, mapDispatchToProps)(UICamera)