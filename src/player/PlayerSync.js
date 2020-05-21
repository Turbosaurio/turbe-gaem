import { connect } from 'react-redux'
import { axios } from 'axios'
import { PORT } from '../constants'
import useInterval from '../functions/useInterval'
import { movePlayer } from '../redux/actions/players'

const PlayerSync = ({watchPlayerPosition, player_id, interval = 500}) => {
	useInterval( () => {
		watchPlayerPosition(player_id)
	}, interval)
	return null
}

const mapDispatchToProps = dispatch => ({
	watchPlayerPosition: async id => {
		fetch(`${PORT}/api/watcher?collection=players`)
			.then( data => data.json())
			.then( res => {
				if(res.changing){
					return true
					// fetch(`${PORT}/api/player?player_id=${id}`)
					// 	.then( data => data.json())
					// 	.then( res => res.data)
					// 	.catch( err => console.log(err))
				} else {
					return false
				}
			})
			.catch( err => console.log(err))
	}
})

export default connect(null, mapDispatchToProps)(PlayerSync)