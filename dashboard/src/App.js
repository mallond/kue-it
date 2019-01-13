import React, { Component } from 'react';
import axios from 'axios';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './App.css';

const Label = ()=> {
  return <div style={{ marginTop: 10, marginBottom: 5 }}></div>;
}

const initalizeJob = (they) => {
  
  
  // Make a request for a user with a given ID
  //'http://localhost:3000/initialize?jobName=OneHundredThousand&transactions=100000'
  axios({
      method: 'get',
      url: 'http://localhost:3001/initialize?jobName=OneHundredThousand&transactions=100000&consumers=44',
    })
    .then(function (response) {
      // handle success
      they.setState({completedCount:0,targetCount:0, startTime:0,duration:0, status:'wait'});
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
      status:'wait',
      startTime: 0,
      percentage:0,
      producerCount:0,
      targetCount:0,
      completedCount:0,
      duration:0
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
            const completedCount = response.data.transactionsCompleted;
            if (they.state.completedCount>0 && they.state.status==="wait") {
              they.setState({startTime:new Date(),status:'running'})
              
            }
            if (they.state.completedCount>0 && they.state.completedCount !== response.data.transactionsRequested) {
              const now = new Date();
              they.setState({duration:(now-they.state.startTime)/1000});
            }
            they.setState({
              percentage: Math.round(percentValue),
              completedCount: completedCount
            });

            if (they.targetCount===0) {
              they.setState({targetCount:response.data.transactionsRequested})
            }
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
    const they = this;
    initalizeJob(they);
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
                <div>{`Completed Count: ${this.state.completedCount}`}</div>
                <div>{`Duration in Seconds: ${this.state.duration}`}</div>
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
