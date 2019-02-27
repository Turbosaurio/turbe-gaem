import React, { Component, Fragment } from 'react'
import './App.css'
import {connect} from 'react-redux'
import {handleLevelsData} from './redux/actions/shared'
import Floor from './architecture/Floor'
import Player from './player/Player'
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
						<Fragment>
							<Floor level={level1}/>
							<Player />
							<UICamera />
						</Fragment>
				}
			</div>
    )
  }
}

const mapStateToProps = ({levels, finish}) => {
	return { levels, finish}
}

export default connect(mapStateToProps)(App)
