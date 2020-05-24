require('dotenv').config({path: '.env.development'})
const { Router } = require('express')
const bodyParser = require('body-parser')
const { ObjectId } = require('mongodb')

const router = Router()
const MONGO_GAME_STATE = process.env.MONGO_DEFAULT_GAME_STATE
const collection = 'gameState'
const jsonParser = bodyParser.json()

router.get('/', (req, res) => {
	db.collection(collection).findOne({
		_id:ObjectId(MONGO_GAME_STATE)
	}, (error, data) => {
		if(error){
			console.log(error)
			return req.json({ success: true, error, data: {} })
		} else {
			return res.json({ success: true, data })
		}
	})
})

router.post('/setSection', jsonParser, (req, res) => {
	const { currentSection } = req.body
	db.collection(collection)
		.updateOne(
			{ _id: ObjectId(MONGO_GAME_STATE) },
			{ $set: { currentSection }},
			{ upsert: false },
			err => {
				if(err){
					console.log(err)
					return res.json({ success: false })
				} else {
					const status = `section changed to ${currentSection}`
					return res.json({ status, success: true })
				}
			}
		)
})

router.post('/createQuestion', jsonParser, (req, res) => {
	db.collection(collection)
		.updateOne(
			{ _id: ObjectId(MONGO_GAME_STATE) },
			{ $push: { questions: req.body }},
			{ upsert: false },
			err => {
				if(err){
					return res.json({ success: false })
				} else {
					return res.json({ success: true })
				}
			}
		)
})

router.post('/setQuestion', jsonParser, (req, res) => {
	const { currentQuestion } = req.body
	db.collection(collection)
		.updateOne(
			{ _id: ObjectId(MONGO_GAME_STATE)},
			{ $set: { currentQuestion }},
			{ upsert: false },
			err => {
				if(err){
					console.log(err)
					return res.json({ success: false })
				} else{
					return res.json({ status: `current question set to ${currentQuestion}`, success: true})
				}
			}
		)
})

router.post('/pushPlayer', jsonParser, (req, res) => {
	const newPlayerId = '111'
	db.collection(collection)
		.updateOne(
			{ _id: ObjectId(MONGO_GAME_STATE) },
			{ $push: { onlinePlayers: newPlayerId}},
			err => {
				if(err){
					return console.log(err)
				} else {
					return res.json({ status: `player ${newPlayerId} is online`, success: true})
				}
			}
		)
})


module.exports = router