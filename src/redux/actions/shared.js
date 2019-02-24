import {
	getLevelsData
} from '../API'

import { getLevels } from './levels'
import { getConfig } from './config'
import { finish } from './finish'

export const handleLevelsData = _ => {
	return dispatch =>{
		return getLevelsData()
			.then(({levels, config}) => {
				dispatch(getLevels(levels))
				dispatch(getConfig(config))
				dispatch(finish('done'))
			})
	}
}