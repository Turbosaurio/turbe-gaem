import { levels } from './levels'

const PORT = process.env.REACT_APP_API_PORT
const settings = 'http://localhost:'+PORT+'/api/settings'
const players = 'http://localhost:'+PORT+'/api/players'

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
	// TODO FETCH LEVELS FROM DB INSTEAD OF A LOCAL FILE
	return new Promise((res,rej) => {
		setTimeout(() => res ({ ...levels}), 100)
	})
}

