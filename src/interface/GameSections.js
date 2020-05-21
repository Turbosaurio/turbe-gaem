import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { PORT } from '../constants'
import { setCurrentSection } from '../redux/actions/gameState'

import SuscribeChannel from '../functions/SuscribeChannel'
import Questions from './Questions'


const Home = () => {
	return(
		<h2>home</h2>
	)
}

const NotFound = () => {
	return(
		<h2>Not Found</h2>
	)
}

const sections = {
	home: <Home />,
	questions: <Questions />,
	notFound: <NotFound />
}

const GameSections = ({currentSection, updateGameState}) =>{
	
	const updateSection = () => {
		fetch(`${PORT}/api/gameState`)
			.then( data => data.json())
			.then( res => {
				updateGameState(res.data.currentSection)
			})
			.catch( err => console.log(err))
	}

	return (
		<div>
			<SuscribeChannel channel="gameState" method="updated" callback={ () => updateSection() }/>
			{sections[currentSection]}
		</div>
	)
}


const mapStateToProps = ({gameState}) => ({ currentSection: gameState.currentSection })
const mapDispatchToProps = dispatch => ({
	updateGameState: section => {
		dispatch(setCurrentSection(section))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(GameSections)
