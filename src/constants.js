import { path } from 'path'

export const PORT = process.env.PORT 
	? path.join('/', process.env.PORT)
	: 'http://localhost:' + process.env.REACT_APP_API_PORT