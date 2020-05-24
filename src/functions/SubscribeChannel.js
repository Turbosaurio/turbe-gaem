import { useEffect } from 'react'
import * as Pusher from 'pusher-js'

export default ({channel, method, callback}) => {
	const pusher = new Pusher(
		process.env.REACT_APP_PUSHER_KEY,
		{ cluster: process.env.REACT_APP_PUSHER_CLUSTER }
	)
	useEffect( _ => {
		pusher.subscribe(channel).bind(method, ({success}) => {
			if(success) callback()
		})
	}, [pusher])
	return null
}