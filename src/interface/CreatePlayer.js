import React, { useState } from 'react'
import { connect } from 'react-redux'
import { PORT } from '../constants'
import useInputs from "./useInputs"
import { createPlayer } from '../redux/actions/players'
import { pushOnlinePlayer } from '../redux/actions/gameState'

import mapJSS from '../styles/jss/mapJSS'
import { useTheme } from 'react-jss'

const styles = _ => {
	const { colors } = useTheme()
	return{
		form: {
			width: '100%',
			display: 'flex',
			alignItems: 'center',
			'& label':{

			},
			'& input':{
				padding: [5,10],
				borderRadius: 5,
				border: 'none',
				marginLeft: '1rem'
			},
		},

		avatars_list:{
			marginTop: '1rem',
		},

		avatar_button:{
			backgroundColor: colors.white,
			width: 100,
			height: 150,
			margin: 5,
			border: 'none',
			borderRadius: 10,
			transition: '.15s',
			opacity: .75,
			'&.active':{
				zIndex: 99,
				opacity: 1,
				transform: 'scale(1.2)',
			}
		},

		avatar_image:{
			display: 'block',
			width: '100%',
			height: '100%',
			objectFit: 'cover'
		}
	}
}

const CreatePlayer = ({ handleCreatePlayer, total }) => {
	const names = {
		name: ''
	}
	const [ inputs, handleInputChange ] = useInputs(names)
	const [ currentAvatar, setAvatar ] = useState(1)
	const avatars = [1,2,3,4,5,6,7,8,9,10,11,12]
	const jss = mapJSS(styles())

	return(
		<div>
			<form
				className={jss(['form'])}
				onSubmit={ e => {
					e.preventDefault()
					handleCreatePlayer({...inputs, avatar: currentAvatar}, total)
				}}
			>
				<label>Name: </label>
				<input type="text" name="name" value={inputs[0]} onChange={handleInputChange}/>
				<input type="submit" value="enter" />
			</form>
			<small>pick an avatar:</small>
			<div
				className={jss(['avatars_list'])}
			>
				{
					avatars.map( i => {
						const src = i < 10
							? `../avatars/avatar_0${i}.png`
							: `../avatars/avatar_${i}.png`
						return (
							<button
								className={`${jss(['avatar_button'])} ${ currentAvatar === i && 'active'}`}
								key={i}
								title={`avatar ${i}`}
								onClick={ _ => { setAvatar(i)}}
							>
								<img
									className={jss(['avatar_image'])}
									alt={`alt ${i}`}
									src={src}
								/>
							</button>
						)
					})
				}
			</div>
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