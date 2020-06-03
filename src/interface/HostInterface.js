import React, { useState } from 'react'
import { connect } from 'react-redux'
import { PORT } from '../constants'
import useInputs from "./useInputs"
import { addQuestion } from  '../redux/actions/gameState'
import mapJSS from '../styles/jss/mapJSS'
import { setCurrentSection, nextQuestion, deleteQuestion } from '../redux/actions/gameState'
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

const HostInterface = ({

		gameState,
		updateSection,
		nextQuestionIndex,
		createQuestion,
		handleSetQuestion,
		deleteQuestion

	}) => {

	const { questions, currentQuestion } = gameState
	const buttons = ['home', 'questions', 'notFound']
	const jss = mapJSS(styles)

  const names = { 
  	text: '',
  	type: '',
  	option_a: '',
  	option_b: '',
  	option_c: '',
  	option_d: '',
  	answer: '',
  }

  const questionProps = {
  	questionText: '',
  	type: '',
  	answer: ''
  }

  const questionOptions = {
  	option_a: '',
  	option_b: '',
  	option_c: '',
  	option_d: '',
  	option_e: '',
  	option_f: '',
  	option_g: '',
  	option_h: '',
  }

	const [ inputs, handleInputChange ] = useInputs(names)
	const [ questionInputs, setQuestionInputs ] = useInputs(questionProps)

	return(
		<div className={jss(['container'])}>
			<div className={jss(['container_inner'])}>
				<h3>select section</h3>
				<div>
					{
						Object.keys(questionProps).map( (q,i) =>
							<input
								key={i}
								type="text"
								value={questionInputs[q]}
								placeholder={q}
								onChange={setQuestionInputs}
						/>)
					}
				</div>
				<div>
					{ buttons.map(b => {
						return(
							<button key={b} onClick={ () => updateSection(b) }>{b}</button>
						)
					}) }
				</div>
				<h3>select question number</h3>
				<select
					onChange={handleSetQuestion}
					defaultValue={currentQuestion}
				>
					{
						questions.map( ({_id, text}, i) => <option key={_id} value={i}>{`${i}: ${text}`}</option> )
					}
				</select>
				
				<h3>create question</h3>
				<form onSubmit={ e => {
					e.preventDefault()
					createQuestion(inputs) 
				}}>
					{
						Object.keys(names).map( (input, i) => 
							<div key={i+input}>
								<label>{input}: </label>
								<input
									type="text"
									onChange={handleInputChange}
									name={input}
									value={inputs[input]}
								/>
							</div>
						)
					}
					<input type="submit" value="create question"/>
				</form>

				<h3>available questions</h3>
				<ol>
					{
						questions.map( ({_id, text, options}, i) => (
							<li key={_id + i}>
								<div>{text}</div>
								<ul>{JSON.stringify(options)}</ul>
								<button title="delete question" value={_id} onClick={deleteQuestion}>x</button>
							</li>
						))
					}
				</ol>				
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
			const { text, ...rest } = newQuestion
			const body = {
				text,
				options: Object.keys(rest).map( i => rest[i] )
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
		},
		deleteQuestion: e => {
			const { value } = e.target
			fetch(`${PORT}/api/gameState/deleteQuestion?_id=${value}`, postOptions)
				.then( data =>  data.json())
				.then( res => {
					if(res.success){
						dispatch(deleteQuestion(value))
					}
				})
				.catch( err => console.log(err))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HostInterface)
