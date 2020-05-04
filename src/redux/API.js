
import {
	_getLevels,
	_getConfig,
	_getPlayers,
	_getGameState,
} from './INITIAL_INFO'


export const getLevelsData = _ =>{
	return Promise.all ([
		_getLevels(),
		_getConfig(),
		_getPlayers(),
		_getGameState(),
	])
	.then(([
		levels,
		config,
		players,
		gameState,
	]) => ({
		levels,
		config,
		players,
		gameState
	}))
}