import React from 'react'
import './App.css'
import { Route, Switch } from 'react-router-dom'
import HostInterface from './interface/HostInterface'
import PlayerInterface from './interface/PlayerInterface'
import GameSections from './interface/GameSections'


const App = () => {
	return(
		<Switch>
			<Route exact path="/" component={GameSections} />
			<Route path="/hostUI" component={HostInterface}/>
			<Route path="/playerUI" component={PlayerInterface}/>
		</Switch>
	)
}

export default App