import {
	getLevelsData
} from '../API'

import { getLevels } from './levels'
import { getConfig } from './config'
import { getPlayers } from './players'
import { finish } from './finish'

export const handleLevelsData = _ => {
	return dispatch =>{
		return getLevelsData()
			.then(({levels, config, players}) => {
				dispatch(getLevels(levels))
				dispatch(getConfig(config))
				dispatch(getPlayers(players))
				dispatch(finish('done'))
			})
	}
}