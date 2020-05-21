import React, {useEffect} from 'react'
import {connect} from 'react-redux'


import Floor from '../architecture/Floor'

import DragScroll from '../functions/DragScroll'

const PlayerInterface  = ({init, finish}) => {
	return (
		<div>
			{
				finish === 'done' &&
					<DragScroll>
						<Floor level={2}/>						
					</DragScroll>
			}
		</div>
	)
}

const mapStateToProps = ({finish}) => ({ finish })

export default connect(mapStateToProps)(PlayerInterface)
