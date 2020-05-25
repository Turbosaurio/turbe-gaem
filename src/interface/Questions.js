import React from 'react'
import { connect } from 'react-redux'

import { PORT } from '../constants'
import { setQuestion } from '../redux/actions/gameState'
import SubscribeChannel from '../functions/SubscribeChannel'

import mapJSS from '../styles/jss/mapJSS'

const Questions = ({ text, options, updateCurrentQuestion }) => {
	const jss = mapJSS(styles)
	return(
		<div className={jss(['game_state'])}>
			<div className={`${jss(['screen'])} questions`}>
				<div className={jss(['screen_inner'])}>
					<h2>questions</h2>
					<div>
						<h1>{text}</h1>
						
						<ul>
							{ options && options.map( o => <li>{o}</li> )}
						</ul>
					</div>

					<SubscribeChannel channel="gameState" method="updated" callback={ _ => { updateCurrentQuestion() }}/>
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

const mapStateToProps = ({ gameState }) => {
	const { questions, currentQuestion } = gameState
	const { text, options } = questions[currentQuestion]
	return { text, options }
}
const mapDispatchToProps = dispatch => ({
	updateCurrentQuestion: _ =>{
		fetch(`${PORT}/api/gameState`)
			.then( data => data.json())
			.then( res => {
				dispatch(setQuestion(res.data.currentQuestion))
			})
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Questions)