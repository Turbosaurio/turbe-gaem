const port = _ => {
	switch(process.env.REACT_APP_ENVIRONMENT){
		case 'production': return{
			PORT: '',
			EVN: 'production'
		}
		default: return{
			PORT: 'http://localhost:' + process.env.REACT_APP_API_PORT,
			ENV: 'development'
		}
	}
}

export const PORT = port().PORT