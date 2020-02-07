import React, {useEffect} from 'react'
import './App.css'
import {connect} from 'react-redux'
import {handleLevelsData} from './redux/actions/shared'

import Floor from './architecture/Floor'
import UICamera from './ui/UICamera'
import DragScroll from './functions/DragScroll'

const App  = ({init, levels, finish}) => {
	useEffect( _ =>{
		init()
	},[])

	return (
		<div>
			{
				finish === 'done' &&
					<DragScroll>
						<Floor level={levels.level1} />
						<UICamera/>
					</DragScroll>
			}
		</div>
	)
}

const mapStateToProps = ({levels, finish}) => ({levels, finish})

const  mapDispatchToProps = dispatch => ({
	init: _ => dispatch(handleLevelsData())
})

export default connect(mapStateToProps,mapDispatchToProps)(App)
