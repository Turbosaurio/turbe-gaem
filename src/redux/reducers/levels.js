import {
	GET_LEVELS
} from '../actions/levels'

export default function levels ( state = {}, action){
	switch(action.type){
		case GET_LEVELS:
			return{
				...state,
				...action.val.levels
			}
		default: return state
	}
}