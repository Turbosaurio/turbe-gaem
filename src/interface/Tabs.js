import React, { useState } from 'react'

import mapJSS from '../styles/jss/mapJSS'

const styles = _ => ({
	tab_container:{
		border: '1px solid white',
		borderRadius: 16,
		padding: 16
	},
	tab_list:{
		display: 'flex',
		margin: 0,
		padding: 0,
		listStyle: 'none'
	},
	tab_label:{
		flex: 1,
		textAlign: 'center',
		'&.active':{
			color: 'red'
		},
		'&>button':{
			border: 'none',
			background: 'transparent',
			padding: 0,
			display: 'inline-block',
			color: 'inherit'
		}
	}
})

export default ({list}) => {
	const [ tab, changeTab ] = useState(list[0].name)
	const jss = mapJSS(styles)
	return(
		<div className={jss(['tab_container'])}>
			<ul className={jss(['tab_list'])}>
				{ list.map( ({ name }, i) =>
					<li
						key={`${i}_name`}
						className={`${jss(['tab_label'])} ${tab === name ? 'active' : ''}`}
					>
						<button onClick={ _ => changeTab(name)}>
							{name}
						</button>
					</li>
				)}
			</ul>
			{ list.find( ({name}) => name === tab ).component }
		</div>
	)
}