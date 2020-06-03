import { path } from 'path'

export const PORT = process.env.PORT === 5000
	? __dirname
	: 'http://localhost:' + process.env.REACT_APP_API_PORT