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
    const cap = [];
    const chL = []; //chartLabels
    const profit = [];

    let j = 0;
    let prof = 0;
    let unprof = 0;

    for (let i of tradesInfo) {
      j = j + i.result
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
    const signalLabel = ['sig6', 'sig9', 'sig3', 'sig10', 'sig5', 'sig1', 'sig7', 'sig8', 'sig2', 'sig4'];

    for (let i of tradesInfo[0].signals) {
      signalsArr.push(0)
    }

    for (let j = 0; j < tradesInfo.length; j++) {
      if (tradesInfo[j].result) {
        for (let i = 0; i < tradesInfo[j].signals.length; i++) {
          let sum = tradesInfo[j].signals[i] + signalsArr[i];
          signalsArr[i] = sum;
        }
      }
    }


    // Security
    const securityObj = []
    const securityProfit = []

    for (let j = 0; j < tradesInfo.length; j++) {
      if (securityObj[tradesInfo[j].security]) {
        securityObj[tradesInfo[j].security].value += tradesInfo[j].result;
      } else {
        securityObj[tradesInfo[j].security] = { name: tradesInfo[j].security, value: tradesInfo[j].result };
      }
      for (let i = 0; i < tradesInfo[j].signals.length; i++) {

        let sum = tradesInfo[j].signals[i] + signalsArr[i];
        signalsArr[i] = sum;
      }
    }

    //Сортировка лэйблов===========================
    const signalsArrLabel = ['sig1', 'sig2', 'sig3', 'sig4', 'sig5', 'sig6', 'sig7', 'sig8', 'sig9', 'sig10']
    const signalsLabelSort = []

    const signalObj = []

    for (let s in signalsArr) {
      signalObj.push({ name: signalsArrLabel[s], value: signalsArr[s] })
    }

    signalObj.sort(function (a, b) {
      return a.value - b.value
    })

    for (let f of signalObj) {
      signalsLabelSort.push(f.name)

    //================================================

    const SecurityLabel = []

    signalsArr = signalsArr.sort(function (a, b) { return b - a })

    for (let i in securityObj) {
      SecurityLabel.push(i)
      securityProfit.push(securityObj[i].value)
    }
    this.setState({
      charts: {
        capital: cap,
        chartLabels: chL
      }
    });
    const { capital, chartLabels } = this.state.charts;
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
              fontColor: '#000000'
            }
          }],
          xAxes: [{
            ticks: {
              beginAtZero: true,
              fontSize: 20,
              fontColor: '#000000'
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
              fontColor: '#000000'
            }
          }],
          xAxes: [{
            ticks: {
              beginAtZero: true,
              fontSize: 20,
              fontColor: '#000000'
            }
          }]
        }
      }
    });
    const ctx3 = document.getElementById('myChart3').getContext('2d');
    const myChart3 = new Chart(ctx3, {
      type: 'bar',
      data: {
        labels: signalsLabelSort,
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
              fontColor: '#000000'
            }
          }],
          xAxes: [{
            ticks: {
              beginAtZero: true,
              fontSize: 20,
              fontColor: '#000000'
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
              fontColor: '#000000'
            }
          }],
          xAxes: [{
            ticks: {
              beginAtZero: true,
              fontSize: 20,
              fontColor: '#000000'
            }
          }]
        }
      }
    });
  }


  render() {
    const { isAuthenticated, user: { firstName } } = this.props.auth;
    return (
      <div>
        <div>
          {!isAuthenticated && <Redirect to='/' />}
          {isAuthenticated && <div>Привет, {firstName}!</div>}
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
