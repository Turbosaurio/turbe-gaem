import {
	getLevelsData
} from '../API'

import { getLevels } from './levels'
import { finish } from './finish'

export const handleLevelsData = _ => {
	return dispatch =>{
		return getLevelsData()
			.then(({levels}) => {
				dispatch(getLevels(levels))
				dispatch(finish('done'))
			})
	}
}