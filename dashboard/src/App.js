import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">


          <div className="App-iphone8">
            <div className="App-atomic App-logo"></div>
            <div className="App-input">
              <div className="App-gauge-run">
                <div>Number of Objects: <input type="text"/></div>
                <div>Number of Workers: <input type="text"/></div>
                <div><input type="button"></input></div>
                <br/>
                <div>State: Loading...</div>
                <div>Percentage: 80 %</div>
                <div>Object Target: 1,000,000.00</div>
                <div>Object Count: 100,000</div>
                <br/>
                <div>Server Count: 3</div>
                <div>CPU: 33% Memory: 33%</div>
              </div>
            </div>
            <div className="App-workarea"></div>
          </div>

        </header>



      </div>
    );
  }
}

export default App;
