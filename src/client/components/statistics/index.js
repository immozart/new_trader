import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { PAGES } from '../../routes/pages';
import './style.css';

const Chart = require('chart.js');

class Statistic extends Component {
  state = {
    tradesInfo: {
      tradesInfo: []
    },
    charts: {
      capital: [],
      chartLabels: []
    }
  };

  // computation = async () => {
  //   const cap = [];
  //   const { tradesInfo } = this.state.tradesInfo;
  //   console.log('tradesInfo:tttttttttt', tradesInfo);
  //   for (let i of tradesInfo) {
  //     cap.push(i.result)
  //   }
  //   this.setState({
  //     carts: {
  //       cap
  //     }
  //   });
  //   console.log('this.state.charts.cap', this.state.charts.cap[0]);
  // }

  fetchData = async () => {
  };

  componentDidMount = async () => {
    try {
      const dataFromBase = await fetch(PAGES.API.fetchData.path);
      this.setState({
        tradesInfo: await dataFromBase.json()
      });
    } catch (e) {
      console.error(e);
    }
    const { tradesInfo } = this.state.tradesInfo;
    // console.log('tradesInfo===fetch()', tradesInfo);


    const cap = [];
    const chL = []; //chartLabels
    const profit = [];

    //  const { tradesInfo } = this.state.tradesInfo;
    // console.log('tradesInfo:tttttttttt', tradesInfo);
    let j = 0;
    let prof = 0;
    let unprof = 0;

    // eslint-disable-next-line no-restricted-syntax
    for (let i of tradesInfo) {
      j = j + i.result
      // console.log('JJJJJJJJJJJJJJJJJJ', j)
      cap.push(j);

      const d = new Date(i.tradeData);
      let format_date = d.getDate() + '.' + (d.getMonth() + 1) + '.' + d.getFullYear()
      chL.push(format_date);

      //Profitable

      if (i.result) {
        unprof++
      } else { prof++ }

    }
    profit.push(unprof, prof);


    //Signals
    let signalsArr = [];
    const signalLabel = ['sig1', 'sig2', 'sig3', 'sig4', 'sig5', 'sig6', 'sig7', 'sig8', 'sig9', 'sig10'];

    for (let i of tradesInfo[0].signals) {
      signalsArr.push(0)
      // console.log('signalsArrsignalsArrsignalsArr', signalsArr)
    }
    //  console.log('tradesInfo.lengthtradesInfo.lengthtradesInfo.lengthtradesInfo.length', tradesInfo.length);

    for (let j = 0; j < tradesInfo.length; j++) {
      if (tradesInfo[j].result) {
        for (let i = 0; i < tradesInfo[j].signals.length; i++) {
          //     console.log('radesInfo[j].signals', tradesInfo[j].signals[i], signalsArr[i]);
          let sum = tradesInfo[j].signals[i] + signalsArr[i];
          signalsArr[i] = sum;
        }
      }
    }
    //   console.log('signalsArr', signalsArr)

    //Security
    const securityObj = []
    const securityProfit = []
    const SecurityLabel = []

    for (let j = 0; j < tradesInfo.length; j++) {
      // eslint-disable-next-line operator-assignment

      if (securityObj[tradesInfo[j].security]) {
        console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHHHH')

        securityObj[tradesInfo[j].security].value += tradesInfo[j].result;
        //   //           h.value += tradesInfo[j].result;
      } else {
        securityObj[tradesInfo[j].security] = { name: tradesInfo[j].security, value: tradesInfo[j].result };
      }

      //   console.log('OBJ-OBJ-OBJ-OBJ-OBJ-OBJ-', securityObj)
      //   //           //  securityObj.value[tradesInfo[j].value] = tradesInfo[j].result;
      // }
      for (let i = 0; i < tradesInfo[j].signals.length; i++) {
        //  console.log('radesInfo[j].signals', tradesInfo[j].signals[i], signalsArr[i]);
        let sum = tradesInfo[j].signals[i] + signalsArr[i];
        signalsArr[i] = sum;
      }
    }

    console.log('SSSSSSSSSSS////////////////////SSSSSSSSSSSSsecurityObj', securityObj)
    console.log('signalsArr', signalsArr);

    signalsArr = signalsArr.sort(function (a, b) { return b - a })
    //   console.log('SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS', signalsArr)

    // securityObj = securityObj.sort(function (a, b) { return a.value - b.value })
    console.log('ooooooooooooooooooooooooooo', securityObj)



    // securityObj.keys(securityObj).forEach(function (prop) {

    // })
    for (let i in securityObj) {
      console.log('securityObjsecurityObjsecurityObj', securityObj[i].value)
      SecurityLabel.push(i)
      securityProfit.push(securityObj[i].value)
    }
    console.log(SecurityLabel)
    console.log(securityProfit)






    this.setState({
      charts: {
        capital: cap,
        chartLabels: chL
      }
    });
    const { capital, chartLabels } = this.state.charts;
    console.log('this.state.charts.cap', capital, chartLabels);
    //  this.fetchData();








    // const { tradesInfo } = this.state.tradesInfo;
    // const { cap } = this.state.charts;
    console.log('tradesInfo===componentDidMount()', capital);

    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: chartLabels,
        datasets: [{
          label: 'Capital',
          data: capital,
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              fontSize: 20,
              fontColor: '#FFFFFF'
            }
          }],
          xAxes: [{
            ticks: {
              beginAtZero: true,
              fontSize: 20,
              fontColor: '#FFFFFF'
            }
          }]
        }
      }
    });

    const ctx2 = document.getElementById('myChart2').getContext('2d');
    const myChart2 = new Chart(ctx2, {
      type: 'pie',
      data: {
        labels: ['Unprofitable', 'Profitable'],
        datasets: [{
          label: 'Profit',
          data: profit,
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              fontSize: 20,
              fontColor: '#FFFFFF'
            }
          }],
          xAxes: [{
            ticks: {
              beginAtZero: true,
              fontSize: 20,
              fontColor: '#FFFFFF'
            }
          }]
        }
      }
    });
    const ctx3 = document.getElementById('myChart3').getContext('2d');
    const myChart3 = new Chart(ctx3, {
      type: 'bar',
      data: {
        labels: signalLabel,
        datasets: [{
          label: 'Signals',
          data: signalsArr,
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              fontSize: 20,
              fontColor: '#FFFFFF'
            }
          }],
          xAxes: [{
            ticks: {
              beginAtZero: true,
              fontSize: 20,
              fontColor: '#FFFFFF'
            }
          }]
        }
      }
    });
    const ctx4 = document.getElementById('myChart4').getContext('2d');
    const myChart4 = new Chart(ctx4, {
      type: 'bar',
      data: {
        labels: SecurityLabel,
        datasets: [{
          label: 'Stocks',
          //   font: {
          //     family: 'Courier'
          //   },
          //   fontsize: '50'
          // },

          data: securityProfit,
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              fontSize: 20,
              fontColor: '#FFFFFF'
            }
          }],
          xAxes: [{
            ticks: {
              beginAtZero: true,
              fontSize: 20,
              fontColor: '#FFFFFF'
            }
          }]
        }
      }
    });

    // console.log('tradesInfo===computation()', tradesInfo);
    // this.computation();
  }


  render() {
    const { isAuthenticated, user: { firstName, email } } = this.props.auth;
    const { tradesInfo } = this.state.tradesInfo;
    return (
      <div>
        <div>
          {!isAuthenticated && <Redirect to='/' />}
          {isAuthenticated && <div>Привет, {firstName}!</div>}
          {/* {JSON.stringify(tradesInfo)} */}
          {/* {tradesInfo.map(trade => <div key={trade.number}>{trade.number}</div>)} */}

        </div>
        <div id='grid'>
          <div className="gridDiv">
            <label>Capital</label>
            <canvas className='canvasChart' id="myChart" width="700" height="700"></canvas>
          </div>
          <div>
          <label>Profit</label>
            <canvas className='canvasChart' id="myChart2" width="700" height="700"></canvas>
          </div>
          <div>
          <label>Signals</label>
            <canvas className='canvasChart' id="myChart3" width="700" height="700"></canvas>
          </div>
          <div>
          <label>Stocks</label>
            <canvas className='canvasChart' id="myChart4" width="700" height="700"></canvas>
          </div>
        </div>

      </div>
    );
  }
}

const mapStatetoProps = state => ({
  auth: state.auth
});

export default connect(mapStatetoProps)(Statistic);
