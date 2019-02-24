import {
	_getLevels,
	_getConfig,
} from './INITIAL_INFO'

export const getLevelsData = _ =>{
	return Promise.all ([
		_getLevels(),
		_getConfig(),
	])
	.then(([levels, config]) => ({ levels, config }))
}