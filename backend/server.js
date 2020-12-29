// const csp = require('content-security-policy')
const { MongoClient } = require('mongodb')
var cors = require('cors')
const express = require('express')

const path = require('path')
const Pusher = require('pusher')

const {
	PORT,
	MONGO_URL,
	P_APP_ID,
	P_KEY,
	P_SECRET,
	P_CLUSTER
} = require('../config')()

console.log('mongo: ', MONGO_URL)

const app = express()
const channels = ['gameState', 'players']
// const globalCSP = csp.getCSP(csp.STARTER_OPTIONS)

const pusher = new Pusher({
	appId: P_APP_ID,
	key: P_KEY,
	secret: P_SECRET,
	cluster: P_CLUSTER,
	useTLS: false
})

const client  = new MongoClient(
	MONGO_URL, 
	{ useNewUrlParser: true, useUnifiedTopology: true }
)

const onChange = change => {
	console.log(change)
	const { operationType, fullDocument } = change
	switch(operationType){
		case 'update':
			return pusher.trigger(
				channels,
				'updated',
				{
					success: true,
					fullDocument
				}
			)
		case 'insert':
			return pusher.trigger(
				channels,
				'inserted',
				{
					success: true
				}
			)
		default: return null
	}
}


client.connect ( (err, client) => {	 
	if(err) return console.log(err)

	db = client.db('gaem')
	
	const gameStateStream = db.collection('gameState').watch()
	const playersStream = db.collection('players').watch()

	app.use(cors())
	// app.use(globalCSP)

	app.use('/api/gameState', require('./routers/gameStateRouter'))
	app.use('/api/maps', require('./routers/mapsRouter'))
	app.use('/api/players', require('./routers/playersRouter').playerRouter)
	app.use('/api/settings', require('./routers/settingsRouter'))

	gameStateStream.on('change', e => onChange(e))
	playersStream.on('change', e => onChange(e))

	app.use(express.static('build'))

	app.listen(PORT, () =>
		console.log(`path is ${__dirname}`,`listening to port ${PORT}`))
})
