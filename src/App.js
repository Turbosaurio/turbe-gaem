import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Floor from './architecture/floor';

class App extends Component{
  render() {
    return (
        <div>
            <Floor floorNumber={1}/>
        </div>
    );
  }
}

export default App;
