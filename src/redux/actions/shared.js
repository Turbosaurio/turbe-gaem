import {
	getLevelsData
} from '../API'

import { getLevels } from './levels'
import { getConfig } from './config'
import { getPlayers } from './players'
import { getGameState } from './gameState'
import { finish } from './finish'

export const handleLevelsData = _ => {
	return dispatch =>{
		return getLevelsData()
			.then(({levels, config, players, gameState}) => {
				dispatch(getLevels(levels))
				dispatch(getConfig(config))
				dispatch(getPlayers(players))
				dispatch(getGameState(gameState))
				dispatch(finish('done'))
			})
	}
}