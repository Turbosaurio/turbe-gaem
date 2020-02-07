import {combineReducers} from 'redux'
import levels from './levels'
import config from './config'
import players from './players'
import finish from './finish'

export default combineReducers({
	levels, config, players, finish
})