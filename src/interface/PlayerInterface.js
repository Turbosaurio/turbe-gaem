import React from 'react'
import Floor from '../architecture/Floor'
import DragScroll from '../functions/DragScroll'
import UICamera from '../ui/UICamera'

export default _ => (
	<DragScroll>
		<Floor level={2}/>
		<UICamera />
	</DragScroll>
)


