export const GET_CONFIG = 'GET_CONFIG'
export const SET_CONFIG_KEY = 'SET_CONFIG_KEY'

export function getConfig (val) {
	return {
		type: GET_CONFIG, val
	}
}

export function setConfigKey (val) {
	return {  type: SET_CONFIG_KEY, val}
}