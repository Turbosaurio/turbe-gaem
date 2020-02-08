import React, {useCallback} from "react"
import {connect} from 'react-redux'
import axios from 'axios'

import {setConfigKey} from '../redux/actions/config'
import {useEventListener} from '../functions/useEventListener'

const UICamera = ({config, currentLevel, _setCamera, _movePlayer}) =>{

	const {playerPos, cameraPos} = config

	useEventListener('keypress', useCallback(
		({keyCode}) => {
			switch(keyCode){
				case 119 : return moveSelected('up') // w
				case 100 : return moveSelected('right') // d
				case 115 : return moveSelected('down') // x
				case 97 : return moveSelected('left') // a

				case 101 : return moveSelected('upRight') // e
				case 99 : return moveSelected('downRight') // c
				case 122 : return moveSelected('downLeft') // z
				case 113 : return moveSelected('upLeft') // q

				default : return null
			}	
		}
	))

	const moveSelected = direction =>{
		const {y, x} = playerPos
		
		switch(cameraPos){
			case 'rot':
				switch(direction){
					case 'upLeft': return handleMove({y: 1, x: 0})
					case 'up': return handleMove({y: 1, x: -1})
					case 'upRight': return handleMove({x: -1, y: 0})
					case 'right': return handleMove({y: -1, x: -1})
					case 'downRight': return handleMove({y: -1, x: 0})
					case 'down': return handleMove({y: -1, x: 1})
					case 'downLeft': return handleMove({x: 1, y: 0})
					case 'left': return handleMove({y: 1, x: 1})
					default: return null
				}
			case 'rev':
				switch(direction){
					case 'up': return handleMove({y: -1, x: 1})
					case 'right': return handleMove({y: 1, x: 1})
					case 'down': return handleMove({y: 1, x: -1})
					case 'left': return handleMove({y: -1, x: -1})
					case 'downLeft': return handleMove({x: -1, y: 0})
					case 'upLeft': return handleMove({y: -1, x: 0})
					case 'upRight': return handleMove({x: 1, y: 0})
					case 'downRight': return handleMove({y: 1, x: 0})
					default: return null
				}
			case 'inv':
				switch(direction){
					case 'upLeft': return handleMove({y: 0, x: 1})
					case 'up': return handleMove({y: 1, x: 1})
					case 'upRight': return handleMove({y: 1, x: 0})
					case 'right': return handleMove({y: 1, x: -1})
					case 'downRight': return handleMove({y: 0, x: -1})
					case 'down': return handleMove({y: -1, x: -1})
					case 'downLeft': return handleMove({y: -1, x: 0})
					case 'left': return handleMove({y: -1, x: 1})
					default: return null
				}
			case 'ori':
				switch(direction){
					case 'upLeft': return handleMove({y: 0, x: -1})
					case 'up': return handleMove({y: -1, x: -1})
					case 'upRight': return handleMove({y: -1, x: 0})
					case 'right': return handleMove({y: -1, x: 1})
					case 'downRight': return handleMove({y: 0, x: 1})
					case 'down': return handleMove({y: 1, x: 1})
					case 'downLeft': return handleMove({y: 1, x: 0})
					case 'left': return handleMove({y: 1, x: -1})
					default: return null
				}
			default: console.log('not valid key')
		}
	}

	const handleMove = ({y, x}) => {
		_movePlayer({
			y: playerPos.y + y,
			x: playerPos.x + x,
		})
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

	function elPosteo(){

		const body = {
			"id": "5e3cb842fbd024400461b8dd",
			"y": 9,
			"x": 7,
		}
		axios({
			headers: { "Content-Type" : "application/json" },
			baseURL: "http://localhost:5000/api/player_position",
			method: "post",
			data: body,
		})

		// instance({
		// })
			.then( res => console.log(res))
			.catch( err => console.log(err))
	}

	function params(){
		
	}

	const handleCameraChange = (dir, cam) =>{ 
		_setCamera(handleRotation(dir, cam))
	}

	const style = {
		backgroundImage: "url('ui-images/rotate-arrow.svg')"
	}

	return(
		<div className="ui-buttons-container">
			<button style={style} onClick={_ => handleCameraChange('left', cameraPos)}>left</button>
			<button style={style} onClick={_ => handleCameraChange('right', cameraPos)}>right</button>
			<button onClick={params}>post</button>
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