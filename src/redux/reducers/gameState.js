import {
	GET_GAME_STATE,
	SET_CURRENT_SECTION,
	NEXT_QUESTION,
	ADD_QUESTION,
	SET_QUESTION,
	DELETE_QUESTION
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
		case ADD_QUESTION:
			return{
				...state,
				questions: [
					...state.questions,
					action.val
				]
			}
		case SET_QUESTION:
			return{
				...state,
				currentQuestion: action.val				
			}
		case DELETE_QUESTION:
			// const [ [action.val] : _, ...rest ] = state.questions
			return{
				...state,
				questions: state.questions.filter( ({_id}) => _id !== action.val)
			}
		default : return state
	}
}