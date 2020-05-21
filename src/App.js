
import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import './App.css'

import { Route, Switch } from 'react-router-dom'
import HostInterface from './interface/HostInterface'
import PlayerInterface from './interface/PlayerInterface'
import GameSections from './interface/GameSections'
import {handleLevelsData} from './redux/actions/shared'


const App = ({init}) => {
	useEffect( _ =>{
		init()
	},[])
	return(
		<Switch>
			<Route path="/sections" component={GameSections} />
			<Route path="/hostUI" component={HostInterface}/>
			<Route path="/playerUI" component={PlayerInterface}/>
		</Switch>
	)
}

const mapDispatchToProps = dispatch => ({
	init: () => dispatch(handleLevelsData())
})

export default connect(null, mapDispatchToProps)(App)