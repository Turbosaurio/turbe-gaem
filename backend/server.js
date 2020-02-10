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

let db

router.get('/settings', (req, res) => {
	db.collection('settings').findOne({
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

router.get('/maps', (req, res) => {
	db.collection('maps').findOne({
		_id: ObjectId('5e3b7ce713d04a1028b991ba')
	},(err, data) =>{
		if(err){
			console.log(err)
			return req.json({ success: false, err})
		} else {
			console.log(data)
			console.log('levels loaded successfully')
			return res.json({ success: true, data })
		}
	})
})

router.get('/players', (req, res) => {
	db.collection('players')
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
	db.collection('players')
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
	db.collection('players')
		.updateOne(
			{ _id: ObjectId(id) },
			{ $set: update },
			{ upsert: false },
			err => {
				if(err){
					return console.log(err)
				} else {
					return res.json({ results: req.body })
				}
			}
		)
})

router.post('/settings_set_player', jsonParser, (req, res) => {
	const { id } = req.body
	db.collection('settings')
		.updateOne(
			{ _id: ObjectId("5e3a1ceb95b0361298633653") },
			{ $set: { selectedPlayer: id}},
			{ upset: false },
			err => {
				if(err){
					return console.log(err)
				} else {
					return res.json({ status: 'Player changed' })
				}
			}

		)
})


router.post('/levels_update', jsonParser, (req, res) => {
	const { levels } = req.body
	const update = { levels: levels }
	db.collection('maps')
		.updateOne(
			{ _id: ObjectId('5e3b7ce713d04a1028b991ba')},
			{ $set: update },
			{ upsert: false },
			err=>{
				if(err){
					return console.log('did not update', err)
				} else {
					return res.json({ status: 'levels updated' })
				}
			}
		)
})

const client  = new MongoClient(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })

client.connect ( (err, client) => {	
	if(err) return console.log(err)

	db = client.db('gaem')

	app.use(cors())
	app.use('/api', router)
	app.listen(PORT, () =>
		console.log(`listening to port ${PORT}`))
})