import {
	GET_GAME_STATE,
	SET_CURRENT_SECTION,
	NEXT_QUESTION
} from '../actions/gameState'

export default function gameState ( state = {}, action){
	switch(action.type){
		case GET_GAME_STATE:
			return {
				...state,
				...action.val
			}
		case SET_CURRENT_SECTION:
			return{
				...state,
				currentSection: action.val
			}
		case NEXT_QUESTION:
			return{
				...state,
				currentQuestion: state.currentQuestion + 1
			}
		default : return state
	}
}