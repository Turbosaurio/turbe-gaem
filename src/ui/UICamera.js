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
		const {config} = this.props
		const {cameraPos} = config
		const style = {
			backgroundImage: "url('ui-images/rotate-arrow.svg')"
		}
		return(
			<div className="ui-buttons-container">
				<button style={style} onClick={_ => this.handleCameraChange('left', cameraPos)}>left</button>
				<button style={style} onClick={_ => this.handleCameraChange('right', cameraPos)}>right</button>
				{
					Object.keys(config).map( d => {
						const div = config[d]
						return <div key={d}>{`${d}:`}<span>{JSON.stringify(div)}</span></div>
						}
					)
				}
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
		_playerFace: data => dispatch(setConfigKey({key: 'face', data}))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UICamera)