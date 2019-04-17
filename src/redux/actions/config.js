export const GET_CONFIG = 'GET_CONFIG'
export const SET_CONFIG_KEY = 'SET_CONFIG_KEY'
export const SET_PLAYER_COORDS = 'SET_PLAYER_COORDS'
export const SET_TARGET_COORDS = 'SET_TARGET_COORDS'

export function getConfig (val) {
	return {type: GET_CONFIG, val}
}

export function setConfigKey (val) {
	return {type: SET_CONFIG_KEY, val}
}

export function setPlayerCoords (val){
	return {type: SET_PLAYER_COORDS, val}
}

export function setTargetCoords(val){
	return {type: SET_TARGET_COORDS, val}
}