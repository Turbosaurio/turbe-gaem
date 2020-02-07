
import {
	_getLevels,
	_getConfig,
	_getPlayers,
} from './INITIAL_INFO'


export const getLevelsData = _ =>{
	return Promise.all ([
		_getLevels(),
		_getConfig(),
		_getPlayers(),
	])
	.then(([
		levels,
		config,
		players,
	]) => ({
		levels,
		config,
		players,
	}))
}