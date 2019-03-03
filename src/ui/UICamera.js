import React from "react"
import {connect} from 'react-redux'
import {setConfigKey} from '../redux/actions/config'

class UICamera extends React.Component{

	handleFacing(num, dir, cam){
		function extra(){
			switch(cam){
				case 'ori' : return 0
				case 'rot' : return 2
				case 'inv' : return 4
				case 'rev' : return 6
				default: return 0
			} 
		}
		if(dir === 'right'){
			return Math.abs(num + extra())
		} else {
			return Math.abs(num - extra())
		}
	}

	handleRotation(dir, cam){
		if(dir === 'left'){
			switch(cam){
				case 'ori' : return ('rot')
				case 'rot' : return ('inv')
				case 'inv' : return ('rev')
				case 'rev' : return ('ori')
				default: return cam
			}
		} else {
			switch(cam){
				case 'ori' : return ('rev')
				case 'rev' : return ('inv')
				case 'inv' : return ('rot')
				case 'rot' : return ('ori')
				default: return cam
			}
		}
	}

	handleCameraChange(dir, cam){
		this.props._setCamera(this.handleRotation(dir, cam))
		this.props._playerFace(
			this.handleFacing(
				this.props.config.face, dir, cam
			)
		)
	}

	render(){
		const {cameraPos, face} = this.props.config
		const style = {
			backgroundImage: "url('ui-images/rotate-arrow.svg')"
		}
		return(
			<div className="ui-buttons-container">
				<button style={style} onClick={_ => this.handleCameraChange('right', cameraPos)}>right</button>
				<button style={style} onClick={_ => this.handleCameraChange('left', cameraPos)}>left</button>
				<div>{`cameraPos: ${cameraPos}`}</div>
				<div>{`playerface: ${face}`}</div>
			</div>
		)
	}
}

const mapStateToProps = ({config}) =>{
	return{config}
}

const mapDispatchToProps = dispatch => {
	return {
		_setCamera: data => dispatch(setConfigKey({key: 'cameraPos', data})),
		_playerFace: data => dispatch(setConfigKey({face: data}))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UICamera)