import React, { Component } from 'react';
import axios from 'axios';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './App.css';

function Label() {
  return <div style={{ marginTop: 10, marginBottom: 5 }}></div>;
}

const initalizeJob = (they) => {
  // Make a request for a user with a given ID
  //'http://localhost:3000/initialize?jobName=OneHundredThousand&transactions=100000'
  axios({
      method: 'get',
      url: 'http://localhost:3001/initialize?jobName=OneHundredThousand&transactions=100000',
    })
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
}

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      percentage:0,
      producerCount:0
    };
    const they = this;
    // Setup Default redis state
    console.log('Initializing Redis');
    initalizeJob(they);

      setInterval(() => {
        //console.log('Do polling here');
        axios({
            method: 'get',
            url: 'http://localhost:3001/jobStatus',
          })
          .then(function (response) {
            // handle success

            const percentValue = response.data.transactionsCompleted / response.data.transactionsRequested * 100;
            they.setState({
              percentage: Math.round(percentValue)
            });

            if (percentValue !== 100 && response.data.doneDone === false) {
              //console.log(`done-done: ${JSON.stringify(response.data)}`);
            }

          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .then(function () {
            // always executed
          });
      }, 50)
  }

  handleRunClick = ()=>{
    console.log('tada')
    initalizeJob();
  }

  render() {
    let percentage = 5;
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-iphone8">
            <div className="App-atomic App-logo"></div>
            <div className="App-input">
              <div className="App-gauge-run">
                <div>
                  <span className="row">Number of Objects:</span>&nbsp; <span ><input type="text" align="right" value="100000" size="7"/></span>
                </div>
                <div>
                  <span className="row">Number of Workers:</span> <span ><input type="text" align="right" value="10" size="7"/></span>
                </div>
                <div>
                  <span><button onClick={this.handleRunClick}>Run</button></span>
                </div>
                <br/>
                <br/>
                <div>Object Target: 100000</div>
                <div>{`Producer Count: ${this.state.producerCount}`}</div>
                <div>Consumer Count: 0</div>
              </div>
            </div>
            <div className="App-workarea" >
              <div className="circle-progress">
                <Label>Loading</Label>
                <CircularProgressbar 
                  percentage={this.state.percentage}
                  text={`${this.state.percentage}%`}
                />
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
