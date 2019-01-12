import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <div className="App-gauge">

            <div className="App-gauge-job-tittle">
              <div className="App-gauge-job">Job:One Million<div className="App-gauge-job-description">Prototype Job Run</div></div>
            </div>

            <div className="App-gauge-run">
              <div>Number of Objects: <input type="text"/></div>
              <div>Number of Workers: <input type="text"/></div>
              <div><input type="button"></input></div>
            </div>

            <div className="App-gauge-chart">
              <div className="App-gauge-ellipse-percentage">80%</div>
              <div className="App-gauge-ellipse-percentage"></div>
              <div className="App-gauge-ellipse-full"></div>
            </div>

            <div className="App-gauge-metrics">
              <div className="App-gauge-runtime">Runtime: 3:35 Minutes<div className="App-gauge-m">Memory:6GB CPU:33 </div></div>

            </div>
          </div>

        </header>



      </div>
    );
  }
}

export default App;
