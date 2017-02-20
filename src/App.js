import 'babel-polyfill';
import 'fastclick';
import 'isomorphic-fetch';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import logo from './logo.svg';
import './App.css';
import fs from 'browserify-fs'
import UploaderContainer from './containers/UploaderContainer';

class App extends Component {
  render() {
    return (
      
      <div className="App">
        <UploaderContainer />
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {userid}=state;
  return {
    userid:userid
  }
}


export default connect(mapStateToProps)(App)

