import React from 'react'
import mapJSS from '../styles/jss/mapJSS'

const styles = {
	row:{
		'&.a':{
			backgroundColor: '#930b20',
			color: 'white'
		},
		'&.b':{
			backgroundColor: '#273160',
			color: 'white'
		},
		'&.c':{
			backgroundColor: '#1a4f42',
			color: 'white'
		},
	},
	row_inner:{
		maxWidth: 800,
		width: '100%',
		margin: [50, 'auto'],
		padding: '2rem',
		boxSizing: 'border-box'
	}
}

export const Row = ({ theme, children }) => {
	const jss = mapJSS(styles)
	return(
		<div className={`${jss(['row'])} ${theme}`}>
			<div className={jss(['row_inner'])}>
				{children}
			</div>
		</div>
	)
}