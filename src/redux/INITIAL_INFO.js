// TODO DEVELOPMENT & PRODUCTION URLS
const PORT = process.env.REACT_APP_API_PORT
const settings = 'http://localhost:'+PORT+'/api/settings'
const players = 'http://localhost:'+PORT+'/api/players'
const maps = 'http://localhost:'+PORT+'/api/maps'
const gameState = 'http://localhost:'+PORT+'/api/gameState'

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
