import React from 'react'
import mapJSS from '../styles/jss/mapJSS'
import { useTheme } from 'react-jss'

const styles = _ => {
	const { colors } = useTheme()
	return{
		row:{
			'&.a':{
				backgroundColor: colors.red,
				color: 'white'
			},
			'&.b':{
				backgroundColor: colors.blue,
				color: 'white'
			},
			'&.c':{
				backgroundColor: colors.green,
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
}

export const Row = ({ theme, children }) => {
	const jss = mapJSS(styles())
	return(
		<div className={`${jss(['row'])} ${theme}`}>
			<div className={jss(['row_inner'])}>
				{children}
			</div>
		</div>
	)
}