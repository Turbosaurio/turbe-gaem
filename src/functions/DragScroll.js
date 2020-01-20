import {createUseStyles} from 'react-jss'
import React from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'

const dragStyles = createUseStyles({
	drag_container:{
		position: 'fixed',
		width: '100vw',
		height: '100vh',
		overflow: 'scroll',
	},
})


const DragScroll = ({children}) => {
	const jss = dragStyles()
	return(
		<ScrollContainer hideScrollbars={true} id="something" className={jss.drag_container}>
			{children}
		</ScrollContainer>)
}

export default DragScroll