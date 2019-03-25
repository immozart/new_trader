import React, { Component } from 'react';
import { PAGES } from '../../routes/pages';
export default class Journal extends Component {
  state = {
    tradesInfo: {
      tradesInfo: []

    }
  };
  fetchData = async () => {
    try {
      const dataFromBase = await fetch(PAGES.API.fetchData.path);
      this.setState({
        tradesInfo: await dataFromBase.json()
      })
    } catch (e) {
      console.error(e);
    }
  };
  componentDidMount() {
    this.fetchData();
  }


  SignalHeader = () => {
    const SignalHeaders = ['1', '2', '3', '4', '5'];
    for (let i = 0; i < SignalHeaders.length; i++) {
      <th key={'th'+i} scope="col">`signal ${i}`</th>
    }
  }


  render() {

    let { tradesInfo } = this.state.tradesInfo;
    // let myObject = JSON.parse(tradesInfo);
    return (
      <div>
        <h2>СДЕЛКИ</h2>
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">number</th>
              <th scope="col">tradeData</th>
              <th scope="col">security</th>
              <th scope="col">Factor</th>
              <th scope="col">openPrice</th>
              <th scope="col">signal 1</th>
              <th scope="col">signal 2</th>
              <th scope="col">signal 3</th>
              <th scope="col">signal 4</th>
              <th scope="col">signal 5</th>
              <th scope="col">signal 6</th>
              <th scope="col">signal 7</th>
              <th scope="col">signal 8</th>
              <th scope="col">signal 9</th>
              <th scope="col">signal 10</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>

          </tbody>
        </table>
        <div>
          {tradesInfo.map(trade =>
            <div key={trade._id}>
              <div>{trade.security}</div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
