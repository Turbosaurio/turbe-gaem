import React, {Fragment, useState} from 'react'
import {createUseStyles} from 'react-jss'


const panelStyles = createUseStyles({
	box:{
		zIndex: 99999,
		position: 'relative',
	},
	button: props => ({
		width: props.layout.size,
		height: props.layout.size,
		borderRadius: '50%',
		border: 'none'
	}),

	subbox:{
		position: 'absolute',
		top: props => props.layout.size,
		left: 0,
	},

	subbutton: props => ({
		display: 'block',
		width: props.layout.size,
		height: props.layout.size,
		borderRadius: '50%',
		border: 'none',
		
	}),

})

const CollapsiblePanel = () => {

	const [state, setState] = useState({
		status: false,
		action: 'open',
	})
	const jss = panelStyles({
		layout:{
			size: 40,
			max: 6,
		},
	})

	const openPanel = _ =>{
		setState(state => ({
			status: !state.status,
			action: state.status ? 'open' : 'close'
		}))
	}

	const actions = (
		<div className={jss.subbox}>
			<button className={jss.subbutton} title="action a">a</button>
			<button className={jss.subbutton} title="action b">b</button>
			<button className={jss.subbutton} title="action c">c</button>
			<button className={jss.subbutton} title="action d">d</button>
			<button className={jss.subbutton} title="action e">e</button>
		</div>
	)
		

	return(
		<div className={jss.box}>
			<button className={`${jss.button} ${state.action}`} title={state.action} onClick={openPanel}>{state.status ? 'o' : 'x'}</button>
				{ state.status && actions }
		</div>

	)
}


export default CollapsiblePanel