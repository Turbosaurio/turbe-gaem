import React from 'react'
import { connect } from 'react-redux'
import { PORT } from '../constants'
import useInputs from "./useInputs"
import { createPlayer } from '../redux/actions/players'
import { pushOnlinePlayer } from '../redux/actions/gameState'

const CreatePlayer = ({ handleCreatePlayer, total }) => {
	const names = {
		name: ''
	}
	const [ inputs, handleInputChange ] = useInputs(names)
	return(
		<div>
			<form onSubmit={ e => {
				e.preventDefault()
				handleCreatePlayer(inputs, total)
			}}>
				<div>
					<label>Name: </label>
					<input type="text" name="name" value={inputs[0]} onChange={handleInputChange}/>
				</div>
				<input type="submit" value="enter" />
			</form>
		</div>
	)
}

const mapStateToProps = ({ players }) => ({ total: players.length })

const mapDispatchToProps = dispatch => ({
	handleCreatePlayer: (info, index) => {

		const postOptions = {
			method: 'POST',
			headers:{
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}

		const thing = {
			...info,
			message: '',
			face: 1,
			type: 'player',
			position: {
				y: 0,
				x: 0
			}
		}

		fetch(`${PORT}/api/players/createPlayer`, {...postOptions, body: JSON.stringify({player: thing}) })
			.then( data => data.json())
			.then( res => {
				if(res.success){
					dispatch( createPlayer( { ...thing,  index, _id: res.id} ) )
					return fetch(`${PORT}/api/gameState/pushPlayer?playerId=${res.id}`, postOptions)
						.then( res => {
							if( res.success){
								dispatch( pushOnlinePlayer(res.id) )
							}
						})
						.catch( err => console.log(err))
				}
			})
			.catch( err => console.log(err))

	}
})

export default connect(mapStateToProps, mapDispatchToProps)(CreatePlayer)