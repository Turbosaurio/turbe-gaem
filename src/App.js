
import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import './App.css'
import { Route, Switch } from 'react-router-dom'

import Navigation from './interface/Navigation'
import HostInterface from './interface/HostInterface'
import CreatePlayer from './interface/CreatePlayer'
import GameSections from './interface/GameSections'
import { handleLevelsData } from './redux/actions/shared'

import { Row } from './interface/common_elements'

const components = {
	home: _ => <Row theme="a"><GameSections /></Row>,
	host: _ => <Row theme="b"><HostInterface /></Row>,
	player: _ => <Row theme="c"><CreatePlayer /></Row>
}

const App = ({finish, init}) => {

	const {
		home,
		host,
		player
	} = components

	useEffect( _ =>{
		init()
	},[])
	if(finish === 'done'){
		return(
			<div>
				<Navigation />
				<Switch>
					<Route path="/" exact component={home} />
					<Route path="/hostUI" component={host}/>
					<Route path="/playerUI" component={player}/>
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