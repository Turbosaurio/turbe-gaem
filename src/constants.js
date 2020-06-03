import { path } from 'path'

export const PORT = process.env.PORT === 5000
	? ''
	: 'http://localhost:' + process.env.REACT_APP_API_PORT


