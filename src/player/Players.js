import React from 'react'
import { connect } from 'react-redux'

import Player from './Player'

const Players = ({onlinePlayers, players}) => {
	return(
		onlinePlayers.map( (p, i) => {

			return(
				<Player {...players.find(({_id}) => _id === p)} key={i}/>
			)
		})
	)
}

const mapStateToProps = ({ gameState, players }) => ({ onlinePlayers: gameState.onlinePlayers, players })

export default connect(mapStateToProps)(Players)