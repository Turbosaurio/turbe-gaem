import { path } from 'path'

export const PORT = process.env.PORT 
	? 'https://nameless-badlands-71015.herokuapp.com/'
	: 'http://localhost:' + process.env.REACT_APP_API_PORT