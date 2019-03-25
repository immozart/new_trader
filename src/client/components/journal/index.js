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
  signalNames = ['sig 1', 'sig 2', 'sig 3', 'sig 4', 'sig 5', 'sig 6', 'sig 7', 'sig 8', 'sig 9', 'sig 10'];
  SignalHeader = this.signalNames.map((item) => {
    return (
      <th key={item} scope="col">{item}</th>
    );
  });

  //   SignalsValue = (signalsArr) => {
  //     signalsArr.map((item)=>
  //     return (
  //       <th key={item} scope="col">{item}</th>
  //     )
  //     );

  // });

  render() {

    let { tradesInfo } = this.state.tradesInfo;
    // let myObject = JSON.parse(tradesInfo);
    return (
      <div>
        <h3><b><i>СДЕЛКИ</i></b></h3>
        <table className="table">
          <thead className="thead-dark">
            <tr key={'Table_header'}>
              <th key={'number'} scope="col">number</th>
              <th key={'tradeData'} scope="col">tradeData</th>
              <th key={'security'} scope="col">security</th>
              <th key={'factor'} scope="col">factor</th>
              <th key={'openPrice'} scope="col">openPrice</th>
              <th key={'closePrice'} scope="col">closePrice</th>
              {this.SignalHeader}
            </tr>
          </thead>
          <tbody>
            {tradesInfo.map(trade =>
              <tr key={trade.number}>
                <td key={trade.number} >{trade.number}</td>
                <td>{trade.tradeData}</td>
                <td>{trade.security}</td>
                <td>{trade.factor}</td>
                <td>{trade.openPrice}</td>
                <td>{trade.closePrice}</td>
                {/* <td>{trade.signals}</td>
                <td>{trade.signals}</td>
                <td>{trade.signals}</td>
                <td>{trade.signals}</td>
                <td>{trade.signals}</td>
                <td>{trade.signals}</td>
                <td>{trade.signals}</td> */}
                {/* {this.SignalsValue(trade.signals)} */}
                {trade.signals.map(signal => <td>{signal}</td>)}
              </tr>
            )}
          </tbody>
        </table>
      </div >
    );
  }
}
