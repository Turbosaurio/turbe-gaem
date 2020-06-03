'use strict'
require('dotenv').config({path: '.env.development'})
module.exports = function(){
	switch(process.env.REACT_APP_ENVIRONMENT){
		case 'development':
			return{
				ENV: 'development',
				PORT: process.env.REACT_APP_API_PORT,
				MONGO_URL: process.env.REACT_APP_MONGO_URL,
				P_APP_ID: process.env.REACT_APP_PUSHER_APP_ID,
				P_KEY: process.env.REACT_APP_PUSHER_KEY,
				P_SECRET: process.env.REACT_APP_PUSHER_SECRET,
				P_CLUSTER: process.env.REACT_APP_PUSHER_CLUSTER,
			}
		case 'production':
			return{
				ENV: 'production',
				PORT: process.env.PORT || process.env.REACT_APP_API_PORT,
				MONGO_URL: process.env.REACT_APP_MONGO_URL,
				P_APP_ID: process.env.REACT_APP_PUSHER_APP_ID,
				P_KEY: process.env.REACT_APP_PUSHER_KEY,
				P_SECRET: process.env.REACT_APP_PUSHER_SECRET,
				P_CLUSTER: process.env.REACT_APP_PUSHER_CLUSTER,
			}
		default: throw new Error('missing envs')
	}
}