import React from 'react'
import { connect } from 'react-redux'
import { PORT } from '../constants'
import { setQuestion } from '../redux/actions/gameState'
import SubscribeChannel from '../functions/SubscribeChannel'

import mapJSS from '../styles/jss/mapJSS'

const Questions = ({ id, text, options, updateCurrentQuestion }) => {
	const jss = mapJSS(styles)
	return(
		<div className={jss(['game_state'])}>
			<div className={`${jss(['screen'])} questions`}>
				<div className={jss(['screen_inner'])}>
					<h2>questions</h2>
					<div>{text}</div>
					<div>
						{ options.map((option, i) =>
							<button
								key={`${id}_${i}`}
							>{option}
							</button>
						)}
					</div>
				</div>
				<SubscribeChannel channel="gameState" method="updated" callback={ _ => { updateCurrentQuestion() }}/>
			</div>
		</div>		
	)
}

const styles = {
	game_state:{
		textAlign: 'center',
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
	const { id, text, options } = questions[currentQuestion]
	return { id, text, options }
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