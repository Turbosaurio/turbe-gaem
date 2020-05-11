
import { SET_CURRENT_SECTION } from '../actions/gameState'
import { MOVE_PLAYER } from '../actions/players'

const logger = (store) => (next) => (action) => {
	console.group(action.type)
		console.log('The action: ', action)
		const returnValue = next(action)
		console.log('The new state: ', store.getState())
	console.groupEnd()
	return returnValue
	// if(action.type !== SET_CURRENT_SECTION || action.type !== MOVE_PLAYER){
	// } else {
	// 	return null
	// }
}

export default logger