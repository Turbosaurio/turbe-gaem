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
		case MOVE_PLAYER:
			return state.map( player => {
				if(player._id !== action.val.id){
					return player
				}
				return {
					...player,
					position: {
						y: action.val.y,
						x: action.val.x
					}
				}
			})
			
		default : return state
	}
}