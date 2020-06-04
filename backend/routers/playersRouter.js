require('dotenv').config({path: '.env.development'})
const { Router } = require('express')
const bodyParser = require('body-parser')
const { ObjectId } = require('mongodb')

const router = Router()
const MONGO_GAME_STATE = process.env.MONGO_DEFAULT_GAME_STATE
const collection = 'players'
const jsonParser = bodyParser.json()

router.get('/', (req, res) => {
	db.collection(collection)
		.find({ type: 'player'})
		.toArray(
			(err, data) => {
				if(err){
					return req.json({success: false, error: err, data: {}})
				} else {
					console.log('players loaded')
					return res.json({success: true, data})
				}
			}
		)
})

router.get('/get_player', jsonParser,  (req, res) => {
	const { playerId } = req.query
	db.collection(collection)
		.findOne(
			{ _id: ObjectId(playerId) },
			(err, data) => {
				if(err) return console.log(err)
				return res.json({ success: true, data})
			}
		)
})

router.post('/set_player_position', jsonParser,  (req, res) => {
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
					return res.json({ results: req.body, success: true })
				}
			}
		)
})

router.post('/createPlayer', jsonParser, (req, res) => {
	const newId = new ObjectId()
	const { id, player } = req.body
	db.collection('players')
		.updateOne(
			{ _id: newId },
			{ $set: { ...player } },
			{ upsert: true },
			err => {
				if(err){
					console.log(err)
					return res.json({ results: 'failed to create player', success: false})
				} else {
					return res.json({ results: newId, success: true })
				}
			}
		)
})

module.exports = router 