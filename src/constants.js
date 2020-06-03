import { path } from 'path'

export const PORT = process.env.REACT_APP_API_PORT === 5000
	? process.env.REACT_APP_API_PORT
	: ''