require('dotenv').config({path: '.env.development'})

const { MongoClient, ObjectId } = require('mongodb')
var cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const router = express.Router()

const PORT = process.env.REACT_APP_API_PORT
const MONGO_URL = process.env.REACT_APP_MONGO_URL
const MONGO_DEFAULT_SETTING = process.env.DEFAULT_SETTINGS

const jsonParser = bodyParser.json()

let settings, players, player

router.get('/settings', (req, res) => {
	settings.collection('settings').findOne({
		_id: ObjectId(MONGO_DEFAULT_SETTING)
	},(err, data) =>{
		if(err){
			console.log(err)
			return req.json({ success: false, error: err, data:{}})
		} else {
			console.log('settings loaded successfully')
			return res.json({success: true, data})
		}
	})
})

router.get('/players', (req, res) => {
	players.collection('players')
		.find({ type: 'player'})
		.toArray(
			(err, data) => {
				if(err){
					console.log(err)
					return req.json({success: false, error: err, data: {}})
				} else {
					console.log('players loaded successfully')
					return res.json({success: true, data})
				}
			}
		)
})

router.get('/player', (req,res) => {
	const { player_name } = req.query
	players.collection('players')
		.findOne(
			{ name : player_name },
			(err, data) => {
				if(err){
					return req.json({succes: false, err})
				} else {
					return res.json({success: true, data})
				}
			}
		)
})

router.post('/player_position', jsonParser,  (req, res) => {
	const { id, x, y } = req.body
	const update = { position: { x, y } }
	players.collection('players')
		.updateOne(
			{ _id: ObjectId(id) },
			{ $set: update },
			{ upsert: false },
			err => {
				if(err){
					return console.log(err)
				} else {
					return res.json({updated: id})
				}
			}
		)
})

const client  = new MongoClient(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })

client.connect ( (err, client) => {	
	if(err) return console.log(err)
	settings = client.db('gaem')
	players = client.db('gaem')
	app.use(cors())
	app.use('/api', router)
	app.listen(PORT, () =>
		console.log(`listening to port ${PORT}`))
})