import{
	GET_PLAYERS,
	MOVE_PLAYER,	
} from '../actions/players'

export default function players ( state = [], action){
	switch(action.type){
		case GET_PLAYERS:
			return [
				...state,
				...action.val
			]
		default : return state
	}
}