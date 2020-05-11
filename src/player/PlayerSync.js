import { connect } from 'react-redux'

import { PORT } from '../constants'
import useInterval from '../functions/useInterval'
import { movePlayer } from '../redux/actions/players'

const PlayerSync = ({players, watchPlayerPosition, player_id, interval = 9000}) => {
	useInterval( () => {
		watchPlayerPosition(player_id)
	}, interval)
	return null
}

const mapStateToProps = ({gameState}) => ({ players: gameState.onlinePlayers})

const mapDispatchToProps = dispatch => ({
	watchPlayerPosition: id => {
		console.log('syncing players positions')
		fetch(`${PORT}/api/player?player_id=${id}`)
			.then( data => data.json())
			.then( res => {
				const { position } = res.data
				console.log(position)
				dispatch(movePlayer(position))
			})
			.catch( err => console.log(err))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(PlayerSync)