import {
	GET_CONFIG,
	SET_CONFIG_KEY,
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
		default: return state
	}
}