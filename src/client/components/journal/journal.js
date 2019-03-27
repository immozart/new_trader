import React, { Component } from 'react';
import { PAGES } from '../../routes/pages';
import icon from '../../public/images/checkmark-16.png';
import './journal.css'
export default class Journal extends Component {
    state = {
        tradesInfo: {
            tradesInfo: []
        }
    };
    fetchData = async () => {
        try {
            const dataFromBase = await fetch(PAGES.API.fetchData.path);
            let tradesInfo = await dataFromBase.json()
            tradesInfo.tradesInfo.sort((a, b) => b.number - a.number);
            this.setState({
                tradesInfo
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
            <th key={'SignalHeader' + item} scope="col">{item}</th>
        );
    });
    RowOfCheckboxes = (keyForIndex) => {
        for (let i = 0; i < 10; i++) {
            return (
                <td scope="col">{keyForIndex}</td>
            );
        }
    };
    RenderChekboxes = this.signalNames.map((item) => {
        return (
            <div className="col" key={'Chekboxes' + item} >
                <input type="text" className="form-control" placeholder={item} />
            </div>
        );
    });
    ParseDate = (dateTimeFromMongo) => {
        let tmpData = new Date(dateTimeFromMongo);
        return (
            tmpData.toLocaleString()
        );
    };
    render() {
        let { tradesInfo } = this.state.tradesInfo;
        let keyIndex = 0;
        return (
            <div >

                <h3><b><i>СДЕЛКИ</i></b></h3>
                <form>
                    <div className="form-row">
                        <div className="col">
                            <input type="text" className="form-control form-number" placeholder="номер" readOnly />
                        </div>
                        <div className="col-2 boxes-data">
                            <input type="text" className="form-control boxes-data" placeholder="дата и время открытия" />
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" placeholder="актив" />
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" placeholder="лот" />
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" placeholder="цена открытия" />
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" placeholder="цена закытия" />
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" placeholder="итог" />
                        </div>
                        {this.RenderChekboxes}
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
                <table className="table table-bordered">
                    <thead className="thead-dark">
                        <tr key={'table headernpm'} align='center'>
                            <th scope="col" className='header-number'>номер</th>
                            <th scope="col" className='header-data'>дата и время открытия</th>
                            <th scope="col">актив</th>
                            <th scope="col">лот</th>
                            <th scope="col">цена открытия</th>
                            <th scope="col">цена закытия</th>
                            <th scope="col">итог</th>
                            {this.SignalHeader}
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {tradesInfo.map(trade =>
                            <tr key={trade.number} className='main-table-row'>
                                <td>{trade.number}</td>
                                <td >{this.ParseDate(trade.tradeData)}</td>
                                <td >{trade.security}</td>
                                <td >{trade.factor}</td>
                                <td >{trade.openPrice}</td>
                                <td >{trade.closePrice}</td>
                                <td >{trade.result}</td>
                                {trade.signals.map(signal => <td key={keyIndex++} >{signal ? <img src={icon} alt="yes" /> : null}</td>)}
                                <td scope="col" >
                                    <button type='button' className='btn btn-danger btn-sm'>
                                        <i className='fa fa-trash-o' aria-hidden="true" />
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div >
        );
    }
}
