import React from 'react'
import { connect } from 'react-redux'

import { PORT } from '../constants'
import { setQuestion } from '../redux/actions/gameState'
import SubscribeChannel from '../functions/SubscribeChannel'

const Questions = ({ id, text, options, currentQuestion, updateCurrentQuestion, questionId }) => {

	const playerId = '5e3cb842fbd024400461b8dd'

	const updateQuestion = () => {
		fetch(`${PORT}/api/gameState`)
			.then( data => data.json())
			.then( res => {
				updateCurrentQuestion(parseInt(res.data.currentQuestion, 16))
			})
			.catch( err => console.log(err))
	}

	const sendAnswer = answer =>{
		const postOptions = {
			method: 'POST',
			headers:{
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
		}
		fetch(
			`${PORT}/api/players/addPlayerAnswer`,
			{...postOptions, body: JSON.stringify({ playerId, questionId, answer })}
		)
			.then( data => data.json() )
			.then( res => {
				if(res.success) console.log('answer sent')
			})
			.catch( err =>  console.log(err))
	}


	return(
		<div>
			<SubscribeChannel channel="gameState" method="updated" callback={ _ => updateQuestion() } />
			<h2>Questions</h2>
			<div>{text}</div>
			<div>
				{ options.map((option, i) =>
					<button
						key={`${id}_${i}`}
						onClick={ _ => sendAnswer(option) }
					>{option}
					</button>
				)}
			</div>
		</div>
	)
}


const mapStateToProps = ({ gameState }) => {
	const { questions, currentQuestion } = gameState
	const { id, text, options } = questions[currentQuestion]
	return { id, text, options, currentQuestion, questionId: questions[currentQuestion]._id }
}
const mapDispatchToProps = dispatch => ({
	updateCurrentQuestion: question =>{
		dispatch(setQuestion(question))
	},
})

export default connect(mapStateToProps, mapDispatchToProps)(Questions)