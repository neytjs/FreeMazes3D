import React, {Component} from 'react';
import Canvas from './canvas-component';
import {keyDown} from "./controls/keyDown.js";

class App extends Component {
  componentDidMount() {
    document.addEventListener("keydown", keyDown, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", keyDown, false);
  }

  render() {
    return (
      <Canvas></Canvas>
    )
  }
}

export default App;
