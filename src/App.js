
import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import './App.css'
import { Route, Switch } from 'react-router-dom'

import Navigation from './interface/Navigation'
import HostInterface from './interface/HostInterface'
import GodStormHost from './interface/GodStormHost'
import GameSections from './interface/GameSections'
import CreatePlayer from './interface/CreatePlayer'
import { handleLevelsData } from './redux/actions/shared'

import { Row } from './interface/common_elements'

const components = {
	home: _ => <Row theme="a"><GameSections /></Row>,
	host: _ => <Row theme="b"><HostInterface /></Row>,
	createPlayer : _ => <Row theme="c"><CreatePlayer /></Row>
}

const App = ({finish, init, update}) => {

	const {
		home,
		host,
		createPlayer,
		player
	} = components


	useEffect( e =>{
		init()
	},[])

	if(finish === 'done'){
		return(
			<div>
				<Navigation />
				<Switch>
					<Route path="/" exact component={home} />
					<Route path="/hostUI" component={host}/>
					<Route path="/newPlayer" component={createPlayer} />
					<Route path="/gottStrum" component={GodStormHost} />
				</Switch>
			</div>
		)
	} else {
		return null
	}
}

const mapStateToProps = ({finish}) => ({finish})

const mapDispatchToProps = dispatch => ({
	init: () => dispatch(handleLevelsData()),
	update: e => dispatch( _ => console.log(e))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
