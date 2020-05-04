export const GET_GAME_STATE = 'GET_GAME_STATE'
export const SET_CURRENT_SECTION = 'SET_CURRENT_SECTION'

export function getGameState(val){
	return{ type: GET_GAME_STATE, val}
}

export function setCurrentSection(val){
	return{ type: SET_CURRENT_SECTION, val}
}