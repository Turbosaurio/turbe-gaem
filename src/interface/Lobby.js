import React from 'react'
import { connect } from 'react-redux'

import SubscribeChannel from '../functions/SubscribeChannel'

const Lobby = ({ players, gameState, updateOnlinePlayers }) => {
	return(
		<div>
			<SubscribeChannel channel="gameState" method="inserted" callback={ () => updateOnlinePlayers() } />
			<ul>
				{ gameState.onlinePlayers.map( (p, i) => {
					const { name, avatar, message } = players.find( ({_id}) => _id === p)
					const src = i < 10
						? `../avatars/avatar_0${i}.png`
						: `../avatars/avatar_${i}.png`
					return(
						<li key={`online_player_${i}`}>

							<div>{name}</div>
							{ avatar && <img
									alt={`alt ${i}`}
									src={src}
							/>}
							<div>{message}</div>
						</li>
					)
				})}
			</ul>
		</div>
	)
}

const mapStateToProps = ({ players, gameState }) => ({ players, gameState })
const mapDispatchToProps = dispatch => ({
	updateOnlinePlayers: () => { console.log(`onlinePlayers insterted`) }
})

export default connect(mapStateToProps, mapDispatchToProps)(Lobby)