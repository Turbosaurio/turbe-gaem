export const GET_PLAYERS = 'GET_PLAYERS'
export const MOVE_PLAYER = 'MOVE_PLAYER'

export function getPlayers (val) {
	return {type: GET_PLAYERS, val}
}

export function movePlayer (val) {
	return {type: MOVE_PLAYER, val}
}