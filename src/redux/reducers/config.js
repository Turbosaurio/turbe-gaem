import {
	GET_CONFIG,
	SET_CONFIG_KEY,
	SET_PLAYER_COORDS,
} from '../actions/config'

export default function levels ( state = {}, action){
	switch(action.type){
		case GET_CONFIG:
			return{
				...state, ...action.val
			}
		case SET_CONFIG_KEY:
			return{
				...state,
				[action.val.key] : action.val.data
			}
		case SET_PLAYER_COORDS:
			return{
				...state,
				y: action.val.y,
				x: action.val.x,
			}
		default: return state
	}
}