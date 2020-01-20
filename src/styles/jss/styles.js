import {createUseStyles} from 'react-jss'

export const tileStyles = createUseStyles({
	box:{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100vh'},
	row: props => ({
		display: 'flex',
		flexWrap: 'wrap',
		width: props.size,
		margin: '0 auto',
		'&:not(:first-child)':{
			marginTop: 2
		}
	}),
	tile: props => ({
		boxSizing: 'border-box',
		flex: 1,
		height: props.size / 10,
		display: 'flex',
		flexDirection: 'column',
		textAlign: 'center',
		justifyContent: 'center',
		background: 'white',

		'&.start':{ background: 'red' },
		'&.selected':{ background: 'yellow' },
		'&.end':{ background: 'blue' },
		
		'&.open':{ background: 'grey' },
		'&.closed':{ background: 'green' },

		'&.blocked': { background: 'black'},
		
		'&:not(:first-child)':{
			marginLeft: 2
		}
	}),


})