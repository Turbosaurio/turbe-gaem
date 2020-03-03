import React, {useCallback} from "react"
import {connect} from 'react-redux'
import axios from 'axios'

import {setConfigKey} from '../redux/actions/config'
import {useEventListener} from '../functions/useEventListener'

const UICamera = ({
		config,
		levelNames,
		players,
		currentLevel,
		_setCamera,
		_movePlayer,
		_changePlayer,
		_changeFloor,
	}) =>{

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

	const handleCameraChange = (dir, cam) =>{ 
		_setCamera(handleRotation(dir, cam))
	}

	return(
		<div className="ui-buttons-container-holder">

			<div className="ui-buttons-container">
				<span>camera: </span>
				<button onClick={_ => handleCameraChange('left', cameraPos)}>left</button>
				<button onClick={_ => handleCameraChange('right', cameraPos)}>right</button>
			</div>

			<div className="ui-buttons-container">
				<span>player: </span>
				{ players.map(
					({ _id, name}) => 
						<button
							value={_id}
							key={ _id }
							onClick={ () => _changePlayer(_id)}
							className={`${ _id === config.selectedPlayer ? 'selected' : ''}`}
						>{ name }
						</button>
				)}
			</div>

			<div className="ui-buttons-container">
				<span>floor: </span>
				{ levelNames.map( name =>
					<button
						key={name}
						onClick={ () => _changeFloor(name) }
						className={`${ name === config.currentFloor ? 'selected' : ''}`}
					>{name}</button>
				)}
			</div>

			<div>
				<input type="text" placeholder="message"/>
				<button>send</button>
			</div>
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


const mapStateToProps = ({levels, config, players}) => ({
	players,
	config,
	levelNames: Object.keys(levels),
	currentLevel: levels[config.currentFloor].tiles
})

const mapDispatchToProps = dispatch => ({
	_setCamera: data => dispatch(setConfigKey({key: 'cameraPos', data})),
	_movePlayer: data => dispatch(setConfigKey({key: 'playerPos', data})),
	_changePlayer: async id => {
		await axios({
			headers: { "Content-Type" : "application/json" },
			baseURL: "http://localhost:5000/api/settings_set_player",
			method: "post",
			data: { id },
		})
		await dispatch(setConfigKey({key: 'selectedPlayer', data: id}))
	},
	_changeFloor: async floor => {
		await axios({
			headers: { "Content-Type" : "application/json" },
			baseURL: "http://localhost:5000/api/settings_set_floor",
			method: "post",
			data: { floor },
		})
		await dispatch(setConfigKey({key: 'currentFloor', data: floor}))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(UICamera)