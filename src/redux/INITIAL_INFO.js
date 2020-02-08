// TODO DEVELOPMENT & PRODUCTION URLS
const PORT = process.env.REACT_APP_API_PORT
const settings = 'http://localhost:'+PORT+'/api/settings'
const players = 'http://localhost:'+PORT+'/api/players'
const maps = 'http://localhost:'+PORT+'/api/maps'

export function _getConfig(){
	return fetch(settings)
		.then(data => data.json())
		.then(res => res.data)
		.catch(err => console.log(err))
}

export function _getPlayers(){
	return fetch(players)
		.then(data => data.json())
		.then(res => res.data)
		.catch(err => console.log(err))
}

export function _getLevels(){
	return fetch(maps)
		.then(data => data.json())
		.then(res => res.data.levels)
		.catch(err => console.log(err))
}

