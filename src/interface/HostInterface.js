import React, { useState } from 'react'
import { connect } from 'react-redux'
import { PORT } from '../constants'
import Tabs from './Tabs'
import { addQuestion } from  '../redux/actions/gameState'
import { setCurrentSection, nextQuestion, deleteQuestion } from '../redux/actions/gameState'
import { setQuestion } from '../redux/actions/gameState'


const HostInterface = ({
		gameState,
		players,
		updateSection,
		nextQuestionIndex,
		createQuestion,
		handleSetQuestion,
		deleteQuestion
	}) => {

	const { questions, currentQuestion, onlinePlayers } = gameState
	const buttons = ['home', 'questions', 'notFound']
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
 
  const [ question, setQuestion ] = useState('')
  const [ correctAnswer, setCorrectAnswer] = useState('a')
	const [ options, setOptions ] = useState({ a: '', b: ''})

	const handleQuestion = e => {
		e.persist()
		setQuestion(e.target.value)
	}

	const handleOptions = e => {
		e.persist()
		setOptions( state => ({
			...state,
			[e.target.name]: e.target.value
		}))
	}

	const removeOption = e => {
		e.preventDefault()
		const { [letters[e.target.value]]: _, ...rest } = options
		setOptions(rest)
	}

	const appendOption = e => {
		e.preventDefault()
		const i = Object.keys(options).length
			if( i < letters.length ){
			const letter = letters[i]
			setOptions( state => ({ 
				...state,
				[letter]: '' 
			}))
		}
	}

	const OnlinePlayers = _ =>(<div>
		<h3>online players</h3>
		<ul>
			{
				onlinePlayers.map( id => {
					const { name } = players.find( ({_id}) => _id === id)
					return <li key={id}>{ name }</li>
				})
			}
		</ul>
	</div>)

	const SelectSection = _ => (<div>
		<h3>select section</h3>
		{ buttons.map(section => {
			return(
				<button key={section} onClick={ () => updateSection(section) }>{section}</button>
			)
		}) }
	</div>)

	const EditQuestion = _ =>{
		const {options, correctAnswer} = gameState.questions[parseInt(currentQuestion, 16)]
		return (<div>
			<h3>select question number</h3>
			<select
				onChange={handleSetQuestion}
				defaultValue={currentQuestion}
			>
				{
					questions.map( ({_id, text}, i) => <option key={_id+i} value={i}>{`${i}: ${text}`}</option> )
				}
			</select>
			<div>Options</div>
			<ul>
				{ options.map ((o,i) => <li key={i}>{o}</li>)}
			</ul>
			<div>Correct answer</div>
			<select defaultValue={correctAnswer}>
				{ options.map( (_, i) => <option value={letters[i]} key={i}>{letters[i]}</option>)}
			</select>
		</div>)
	}

	const CreateQuestion = _ => (<div>
		<h3>create question</h3>
		<form onSubmit={ e => {
			e.preventDefault()
			createQuestion({
				text: question,
				correctAnswer,
				...options
			}) 
		}}>
			<div>
				<label>Question text: </label>
				<input
					type="text"
					onChange={handleQuestion}
					name="question"
					placeholder="type your question"
					value={question}
				/>
			</div>
			{
				Object.keys(options).map( (input, i) => 
					<div key={i+input}>
						<label>{input}: </label>
						<input
							type="text"
							onChange={handleOptions}
							name={input}
							value={options[input]}
						/>
						{ i > 1 && <button onClick={removeOption} value={i}>-</button> }
					</div>
				)
			}
			<div>
				<span>select correct answer: </span>
				<select defaultValue="a" onChange={ e => setCorrectAnswer(e.target.value) }>
					{ Object.keys(options).map( (o, i) => <option key={o+i} value={o}>{o}</option>)}
				</select>
			</div>
			<button onClick={ appendOption }>add option</button>
			<input type="submit" value="create question"/>
		</form>
	</div>)

	const AllQuestions = _ => (<div>
		<h3>available questions</h3>
		<ol>
			{
				questions.map( ({_id, text, options}, i) => (
					<li key={_id + i}>
						<div>{text}</div>
						<div>{JSON.stringify(options)}</div>
						<button title="delete question" value={_id} onClick={deleteQuestion}>x</button>
					</li>
				))
			}
		</ol>	
	</div>)

	const hostComponents = [
		{
			name: 'Online Players',
			component: <OnlinePlayers />
		},
		{
			name: 'Select Section',
			component: <SelectSection />
		},
		{
			name: 'Edit Question',
			component: <EditQuestion />
		},
		{
			name: 'Create Question',
			component: <CreateQuestion />
		},
		{
			name: 'All Questions',
			component: <AllQuestions />
		}
	]

	return(
		<div>
			<h2>Host</h2>
			<Tabs list={hostComponents} />
		</div>
	)
}

const mapStateToProps = ({ gameState, players }) => ({ gameState, players })

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
			const { text, correctAnswer, ...rest } = newQuestion
			const body = {
				text,
				correctAnswer,
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
