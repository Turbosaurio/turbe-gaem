import React, { useState } from 'react'
import { connect } from 'react-redux'
import { PORT } from '../constants'
import useInputs from "./useInputs"
import { addQuestion } from  '../redux/actions/gameState'
import mapJSS from '../styles/jss/mapJSS'
import { setCurrentSection, nextQuestion } from '../redux/actions/gameState'
import { setQuestion } from '../redux/actions/gameState'

const styles = {
	container: {
		color: 'white',
		backgroundColor: '#1a4f42',
	},
	container_inner:{
		width: '100%',
		maxWidth: 800,
		margin: [0, 'auto'],
		padding: ['2rem', 0],		
	}
}

const HostInterface = ({ gameState, updateSection, nextQuestionIndex, createQuestion, handleSetQuestion }) => {
	const { questions, currentQuestion } = gameState
	const buttons = ['home', 'questions', 'notFound']
	const jss = mapJSS(styles)
  const names = { text: '', option_1: '', option_2: '', option_3: '', option_4: ''}
	const { inputs, handleInputChange } = useInputs(names)

	return(
		<div className={jss(['container'])}>
			<div className={jss(['container_inner'])}>
				<h2>host interface</h2>
				<h3>section</h3>
				<div>
					{ buttons.map(b => {
						return(
							<button key={b} onClick={ () => updateSection(b) }>{b}</button>
						)
					}) }
				</div>
				<h3>questions</h3>

				<select
					onChange={handleSetQuestion}
					defaultValue={currentQuestion}
				>
					{
						questions.map( ({id, text}, i) => <option key={id} value={i}>{`${i}: ${text}`}</option> )
					}
				</select>
				

				<form onSubmit={ e => {
					e.preventDefault()
					createQuestion(inputs) 
				}}>
					{
						Object.keys(names).map( (input, i) => 
							<input
								key={i+input}
								type="text"
								onChange={handleInputChange}
								name={input}
								placeholder={input}
								value={inputs[input]}
							/>
						)
					}
					<input type="submit" value="submit" />
				</form>
				<br/>
				{
					questions.map( ({id, text, options}) => (
						<div key={id+text}>
							<div>{text}</div>
							<ul>
								{ options.map( o => <li key={o}>{JSON.stringify(o)}</li>)}
							</ul>
						</div>
					))
				}
			

			</div>
		</div>
	)
}

const mapStateToProps = ({gameState}) => ({ gameState })

const mapDispatchToProps = dispatch => {
	const postOptions = {
		method: 'POST',
		headers:{
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	}

	return{
		updateSection: currentSection => {
			fetch(
				`${PORT}/api/gameState/setSection`,
				{...postOptions, body: JSON.stringify({currentSection})}
			)
				.then( data => data.json())
				.then( res => {
					if(res.succses){
						dispatch(setCurrentSection(currentSection))
					}
				})
				.catch( err => console.log(err))
		},
		nextQuestionIndex: currentQuestion => {
			fetch(`${PORT}/api/gameState/setQuestion`, { ...postOptions, body: JSON.stringify(currentQuestion)})
				.then( data => data.json())
				.then( res => {
					if(res.success){
						dispatch(nextQuestion(currentQuestion))
					}
				})
				.catch( err => console.log(err))

		},
		createQuestion: newQuestion => {
			const { text, option_1, option_2, option_3, option_4 } = newQuestion
			const body = {
				id: 'm',
				text,
				options: [option_1, option_2, option_3, option_4 ]
			}
			fetch(`${PORT}/api/gameState/createQuestion`, { ...postOptions, body: JSON.stringify(body)})
				.then( data => data.json())
				.then( res => {
					if(res.success){
						dispatch(addQuestion(body))
					}
				})
				.catch( err => console.log(err))
		},
		handleSetQuestion: e => {
			const { value } = e.target
			fetch(`${PORT}/api/gameState/setQuestion?currentQuestion=${value}`, postOptions)
				.then( data =>  data.json())
				.then( res => {
					if(res.success){
						dispatch(setQuestion(value))
					}
				})
				.catch( err => console.log(err))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HostInterface)
