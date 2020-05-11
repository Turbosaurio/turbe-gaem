// TODO DEVELOPMENT & PRODUCTION URLS
import { PORT } from '../constants'

const settings = PORT+'/api/settings'
const players = PORT+'/api/players'
const maps = PORT+'/api/maps'
const gameState = PORT+'/api/gameState'

function connectDB(depratment){
	return fetch(depratment)
		.then(data => data.json())
		.then(res => res.data)
		.catch(err => console.log(err))
}
export const _getConfig = () => connectDB(settings)
export const _getPlayers = () => connectDB(players)
export const _getLevels = () => connectDB(maps)
export const _getGameState = () => connectDB(gameState)
