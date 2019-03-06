import React, { Component, Fragment } from 'react'
import './App.css'
import MapArray from './functions/pathfinder2'
import {connect} from 'react-redux'
import {handleLevelsData} from './redux/actions/shared'
import Floor from './architecture/Floor'
import UICamera from './ui/UICamera'


class App extends Component{
	componentDidMount(){
		this.props.dispatch(handleLevelsData())
	}
  render(){
  	const {levels, finish} = this.props
  	const {level1, level2} = levels
		return (
			<div>
				{
					finish === 'done' &&
						<div className="squares-test">
							<MapArray />
						</div> 
				}
			</div>
    )
  }
}

const mapStateToProps = ({levels, finish}) => {
	return { levels, finish}
}

export default connect(mapStateToProps)(App)
