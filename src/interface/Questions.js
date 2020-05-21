import React from 'react'
import { connect } from 'react-redux'

import mapJSS from '../styles/jss/mapJSS'

const Questions = ({ gameState }) => {
	const jss = mapJSS(styles)

	const questionsList = [1,2,3,4,5,6,7,8,9]

	return(
		<div className={jss(['game_state'])}>
			<div className={`${jss(['screen'])} questions`}>
				<div className={jss(['screen_inner'])}>
					<h2>questions</h2>
					<h1>{questionsList[gameState.currentQuestion]}</h1>
				</div>
			</div>
		</div>		
	)
}

const styles = {
	game_state:{
		textAlign: 'center',
		position: 'fixed',
		top: 0,
		left: 0,
		width: '100%',
		// height: '100vh',
	},
	screen:{
		height: '100%',
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: ['1rem', 0],

		'& h2':{
			margin: 0,
			textTransform: 'uppercase'
		},

		'&.home':{
			backgroundColor: 'red',
			color: 'white',
		},

		'&.questions':{
			backgroundColor: 'green',
			color: 'white',
		},
		'&.notfound':{
			backgroundColor: 'pink',
			color: 'black',
		}
	},
	screen_inner:{
		width: '100%',
		maxWidth: 800,
		margin: [0, 'auto'],
	}
}

const mapStateToProps = ({ gameState }) => ({ gameState })

export default connect(mapStateToProps)(Questions)