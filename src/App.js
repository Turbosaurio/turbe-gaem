
import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import './App.css'
import { Route, Switch } from 'react-router-dom'

import Navigation from './interface/Navigation'
import HostInterface from './interface/HostInterface'
import PlayerInterface from './interface/PlayerInterface'
import GameSections from './interface/GameSections'
import { handleLevelsData } from './redux/actions/shared'

const App = ({finish, init}) => {
	useEffect( _ =>{
		init()
	},[])
	if(finish === 'done'){
		return(
			<div>
				<Navigation />
				<Switch>
					<Route path="/" exact component={GameSections} />
					<Route path="/hostUI" component={HostInterface}/>
					<Route path="/playerUI" component={PlayerInterface}/>
				</Switch>
			</div>
		)
	} else {
		return null
	}
}

const mapStateToProps = ({finish}) => ({finish})

const mapDispatchToProps = dispatch => ({
	init: () => dispatch(handleLevelsData())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)