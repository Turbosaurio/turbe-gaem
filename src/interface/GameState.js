import { connect } from 'react-redux'

import useInterval from '../functions/useInterval'
import { setCurrentSection } from '../redux/actions/gameState'


const GameState = ({ watchGameState, interval = 500 }) => {
	useInterval( () => {
		watchGameState()
	}, interval)
	return null
}

const mapDispatchToProps = dispatch => {
	return{
		watchGameState: () => {
			fetch('http://localhost:5000/api/gameState')
			.then( data => data.json())
			.then( res => {
				dispatch(setCurrentSection(res.data.currentSection))
			})
			.catch( err => console.log(err))	
		}
	}
}

export default connect(null, mapDispatchToProps)(GameState)