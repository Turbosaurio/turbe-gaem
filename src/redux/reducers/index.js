import {combineReducers} from 'redux'
import levels from './levels'
import config from './config'
import finish from './finish'

export default combineReducers({
	levels, config, finish
})