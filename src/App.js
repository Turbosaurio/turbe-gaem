import React, { Component } from 'react';
import './App.css';

import Floor from './architecture/floor';
import {floorOne,floorTwo} from './levels/levels';
import {UICamera} from './ui/ui-camera';

class App extends Component{
	_changeState(keyValue, fun){
		let objeto = fun(this.state, keyValue);
		this.setState({objeto});
	}
	constructor(){
		super();
		this.changeState = this._changeState.bind(this);
		this.state = {
			cameraPosition: "ori",
			initialFloor: floorOne
		}
	}
  render() {
	const {initialFloor} = this.state;
	return (
		<div>
			<Floor floorNumber={initialFloor}/>
			<UICamera
				buttonFunctions={this._changeState}
			/>
		</div>
    );
  }
}

export default App;
