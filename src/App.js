import React, {useEffect} from 'react'
import './App.css'
import {connect} from 'react-redux'
import {handleLevelsData} from './redux/actions/shared'

import Floor from './architecture/Floor'
import UICamera from './ui/UICamera'
import DragScroll from './functions/DragScroll'

const App  = ({init, finish}) => {
	useEffect( _ =>{
		init()
	},[])

	return (
		<div>
			{
				finish === 'done' &&
					<DragScroll>
						<Floor level={1}/>
						<Floor level={2}/>
						<UICamera/>
					</DragScroll>
			}
		</div>
	)
}

const mapStateToProps = ({config, levels, finish}) => {
	const {currentFloor} = config
	return{
		finish
	}
}



const  mapDispatchToProps = dispatch => ({
	init: _ => dispatch(handleLevelsData())
})

export default connect(mapStateToProps,mapDispatchToProps)(App)
