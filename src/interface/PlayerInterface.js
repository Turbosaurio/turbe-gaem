import React, {useEffect} from 'react'

import {connect} from 'react-redux'
import {handleLevelsData} from '../redux/actions/shared'

import Floor from '../architecture/Floor'

import DragScroll from '../functions/DragScroll'

const PlayerInterface  = ({init, finish}) => {

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
						
					</DragScroll>
			}
		</div>
	)
}

const mapStateToProps = ({finish}) => ({ finish })

const  mapDispatchToProps = dispatch => ({
	init: () => dispatch(handleLevelsData())
})

export default connect(mapStateToProps,mapDispatchToProps)(PlayerInterface)
