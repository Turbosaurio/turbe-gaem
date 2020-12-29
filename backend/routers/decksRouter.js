require('dotenv').config({path: '.env.development'})
const { Router } = require('express')
const bodyParser = require('body-parser')
const { ObjectId } = require('mongodb')

const router = Router()
const MONGO_GAME_STATE = process.env.MONGO_DEFAULT_GAME_STATE
const collection = 'decks'
const jsonParser = bodyParser.json()

router.get('/', (req, res) => {
	// db.collection(collection).findOne({
	// 	_id: ObjectId('5e3b7ce713d04a1028b991ba')
	// },(err, data) =>{
	// 	if(err){
	// 		console.log(err)
	// 		return req.json({ success: false, err})
	// 	} else {
	// 		console.log(data)
	// 		console.log('decks loaded successfully')
	// 		return res.json({ success: true, data })
	// 	}
	// })
})

module.exports = router