import {
	_getLevels,
} from './LEVELS.js'

export const getLevelsData = _ =>{
	return Promise.all ([
		_getLevels(),
	])
	.then(([levels]) => ({ levels }))
}