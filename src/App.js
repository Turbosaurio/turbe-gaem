import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Floor from './architecture/floor';
import {UICamera} from './ui/ui-camera';

class App extends Component{
  render() {
    return (
        <div>
            <Floor floorNumber={1}/>
            <UICamera />
        </div>
    );
  }
}

export default App;
