import React from 'react'
import { connect } from 'react-redux'
import mapJSS from '../styles/jss/mapJSS'
import GameStateSync from './GameStateSync'

const styles = {
	game_state:{
		textAlign: 'center',
		position: 'fixed',
		top: 0,
		left: 0,
		width: '100%',
		// height: '100vh',
	},
	screen:{
		height: '100%',
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: ['1rem', 0],

		'& h2':{
			margin: 0,
			textTransform: 'uppercase'
		},

		'&.home':{
			backgroundColor: 'red',
			color: 'white',
		},

		'&.details':{
			backgroundColor: 'green',
			color: 'white',
		},
		'&.notfound':{
			backgroundColor: 'pink',
			color: 'black',
		}
	},
	screen_inner:{
		width: '100%',
		maxWidth: 800,
		margin: [0, 'auto'],
	}
}

const Home = () => {
	const jss = mapJSS(styles)
	return(
		<div className={`${jss(['screen'])} home`}>
			<div className={jss(['screen_inner'])}>
				<h2>home</h2>
				<div>Sed eu augue a ligula imperdiet iaculis ac vitae enim. Sed varius imperdiet sem nec gravida. Sed finibus hendrerit ligula, a molestie lectus euismod eu. Aliquam commodo auctor nisl, et consequat nunc venenatis eget. Curabitur mollis imperdiet iaculis. Nulla ut turpis eu est efficitur rutrum. Duis at turpis mi. In vitae fermentum enim. Donec tincidunt pellentesque ullamcorper. Phasellus nec lacus auctor justo rutrum viverra vel nec est. Mauris a ultricies justo. </div>
			</div>
		</div>
	)
}

const Details = () => {
	const jss = mapJSS(styles)
	return(
		<div className={`${jss(['screen'])} details`}>
			<div className={jss(['screen_inner'])}>
				<h2>details</h2>
				<div>Praesent porttitor ex mauris, at placerat ante convallis ut. Morbi id nulla ut massa euismod semper nec in enim. Integer sit amet lacinia eros. Maecenas at sem sit amet nibh porta rhoncus. Aliquam erat volutpat. Donec consectetur mi quis dapibus hendrerit. Aliquam aliquet hendrerit tincidunt. </div>
			</div>
		</div>
	)
}

const NotFound = () => {
	const jss = mapJSS(styles)
	return(
		<div className={`${jss(['screen'])} notfound`}>
			<div className={jss(['screen_inner'])}>
				<h2>Not Found</h2>
			</div>
		</div>
	)
}

const sections = {
	home: <Home />,
	details: <Details />,
	notFound: <NotFound />
}

const GameSections = ({gameState}) =>{
	const jss = mapJSS(styles)
	const { currentSection } = gameState
	return(
		<div className={jss(['game_state'])}>
				<GameStateSync />
				{ sections[currentSection] }
		</div>		
	)
}

const mapStateToProps = ({gameState}) => ({ gameState })

export default connect(mapStateToProps)(GameSections)
