import React, { Component } from 'react';
import axios from 'axios';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './App.css';


function Label() {
  return <div style={{ marginTop: 10, marginBottom: 5 }}></div>;
}

class App extends Component {

  constructor(props) {
    super(props);
    // Setup Default redis state
    console.log('Initializing Redis');

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

      setInterval(()=>{
        //console.log('Do polling here');
        axios({
          method: 'get',
          url: 'http://localhost:3001/jobStatus',
        })
        .then(function (response) {
          // handle success
          if (response.data.doneDone === false) {
           console.log(`done-done: ${JSON.stringify(response.data)}`);
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
      },1000)
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
                  <span><input type="button" value="run"></input></span>
                </div>
                <br/>
                <br/>
                <div>Object Target: 100000</div>
                <div>Producer Count: 500</div>
                <div>Consumer Count: 0</div>
              </div>
            </div>
            <div className="App-workarea" >
              <div className="circle-progress">
                <Label>Loading</Label>
                <CircularProgressbar 
                  percentage={percentage}
                  text={`${percentage}%`}
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
