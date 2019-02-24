import React from "react"
import {connect} from 'react-redux'
import {setConfigKey} from '../redux/actions/config'

class UICamera extends React.Component{
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
	}
	render(){
		const { cam } = this.props
		return(
			<div className="ui-buttons-container">
				<button onClick={_ => this.handleCameraChange('left', this.props.cam)}>left</button>
				<button onClick={_ => this.handleCameraChange('right', this.props.cam)}>right</button>
				<div>{cam}</div>
			</div>
		)
	}
}

const mapStateToProps = ({config}) =>{
	return{ cam: config.cameraPos }
}

const mapDispatchToProps = dispatch => {
	return {
		_setCamera: data => dispatch(setConfigKey({key: 'cameraPos', data}))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UICamera)