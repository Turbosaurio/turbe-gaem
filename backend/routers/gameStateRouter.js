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
	console.log(currentSection)
	db.collection(collection)
		.updateOne(
			{ _id: ObjectId(MONGO_GAME_STATE) },
			{ $set: { currentSection: currentSection }},
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

router.post('/updateDeck', jsonParser, (req, res) => {
	const { newDeck } = req.body
	db.collection(collection)
		.updateOne(
			{ _id: ObjectId(MONGO_GAME_STATE) },
			{ $set: { deck: newDeck }},
			{ upsert: false },
			err => {
				if(err){
					console.log(err)
					return res.json({ success: false })
				} else {
					return res.json({ message: 'updated deck', success: true})
				}
			}
		)
})

router.post('/createQuestion', jsonParser, (req, res) => {
	const _id = new ObjectId()
	const questions = {
		...req.body,
		_id
	}
	db.collection(collection)
		.updateOne(
			{ _id: ObjectId(MONGO_GAME_STATE) },
			{ $push: { questions }},
			{ upsert: false },
			err => {
				if(err){
					return res.json({ success: false })
				} else {
					console.log(_id)
					return res.json({ success: true, status: `created new question with id: ${_id}` })
				}
			}
		)
})

router.post('/setQuestion', jsonParser, (req, res) => {
	const { currentQuestion } = req.query
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
	const { playerId } = req.query
	db.collection(collection)
		.updateOne(
			{ _id: ObjectId(MONGO_GAME_STATE) },
			{ $push: { onlinePlayers: playerId }},
			err => {
				if(err){
					console.log(err)
					return res.json({ success: false, err})
				} else {
					return res.json({ status: `player ${playerId} is online`, success: true})
				}
			}
		)
})

router.post('/deleteQuestion', jsonParser, (req, res) => {
	const { _id } = req.query
	db.collection(collection)
		.updateOne(
			{ _id: ObjectId(MONGO_GAME_STATE) },
			{ $pull: { questions: { _id: ObjectId(_id) }}},
			{ multi: false },
			err => {
				if(err){
					console.log(err)
					return res.json({ success: false })
				} else {
					return res.json({ status: `deleted question ${_id}`, success: true})
				}
			}
		)
})


module.exports = router