require('dotenv').config({path: '.env.development'})
const { Router } = require('express')
const bodyParser = require('body-parser')
const { ObjectId } = require('mongodb')

const router = Router()
const MONGO_GAME_STATE = process.env.MONGO_DEFAULT_GAME_STATE
const MONGO_DEFAULT_SETTING = process.env.DEFAULT_SETTINGS
const collection = 'settings'
const jsonParser = bodyParser.json()

router.get('/', (req, res) => {
	db.collection(collection).findOne({
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

module.exports = router