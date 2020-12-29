import React from 'react'
import { connect } from 'react-redux'
import { cards } from '../deck/cards'

const GodStormHost = ({ deck, hola }) => {
	return(
		<div>
			<div>godstrom host</div>
			<ul>
				{
					Object.keys(deck).map( card => {
						const { type, status, name } = deck[card]
						return(
							<li key={card}>
								<div>{type}</div>
								<div>{status}</div>
								<div>{name}</div>
							</li>
						)
					})
				}
			</ul>
		</div>
	)
}

const mapStateToProps = ({gameState}) => {
	const { deck } = gameState
	return { deck }
}

const mapDispatchToProps = dispatch => {
	return{
		hola: _ => dispatch(console.log('caca'))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(GodStormHost)