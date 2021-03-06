export const GET_GAME_STATE = 'GET_GAME_STATE'
export const SET_CURRENT_SECTION = 'SET_CURRENT_SECTION'
export const NEXT_QUESTION = 'NEXT_QUESTION'
export const ADD_QUESTION = 'ADD_QUESTION'
export const SET_QUESTION = 'SET_QUESTION'
export const DELETE_QUESTION = 'DELETE_QUESTION'
export const PUSH_ONLINE_PLAYER = 'PUSH_ONLINE_PLAYER'

export function getGameState(val){
	return{ type: GET_GAME_STATE, val}
}

export function setCurrentSection(val){
	return{ type: SET_CURRENT_SECTION, val}
}

export function nextQuestion(){
	return{ type: NEXT_QUESTION}
}

export function setQuestion( val){
	return{ type: SET_QUESTION, val }
}

export function addQuestion(val){
	return { type: ADD_QUESTION, val}
}

export function deleteQuestion(val){
	return { type: DELETE_QUESTION, val}
}

export function pushOnlinePlayer(val){
	return { type: PUSH_ONLINE_PLAYER, val}
}