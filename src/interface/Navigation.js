import React from 'react'
import { useHistory } from "react-router-dom"

const Navigation = () => {
	const history = useHistory()
	return(
		<nav>
			<button onClick={() => history.push('/') }>home</button>
			<button onClick={() => history.push('/hostUI') }>host</button>
			<button onClick={() => history.push('/playerUI') }>player</button>
		</nav>
	)
}

export default Navigation
