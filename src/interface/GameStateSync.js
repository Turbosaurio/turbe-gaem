import { connect } from 'react-redux'

import { PORT } from '../constants'
import useInterval from '../functions/useInterval'
import { setCurrentSection } from '../redux/actions/gameState'

const GameStateSync = ({ watchGameState, watchPlayersPositions, players, interval = 500 }) => {
	useInterval( () => {
		watchGameState()
	}, interval)
	return null
}

const mapDispatchToProps = dispatch => ({
	watchGameState: () => {
		console.log('syncing gamestate')
		fetch(`${PORT}/api/gameState`)
			.then( data => data.json())
			.then( res => {
				dispatch(setCurrentSection(res.data.currentSection))
			})
			.catch( err => console.log(err))	
	}
})

export default connect(null, mapDispatchToProps)(GameStateSync)