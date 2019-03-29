import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PAGES } from '../../routes/pages';
import icon from '../../public/images/checkmark-16.png';
import './journal.css'
import { Button, ButtonGroup, Form } from 'react-bootstrap';
import moment from 'moment-timezone';
class Journal extends Component {
    state = {
        tradesInfo: { tradesInfo: [] },
        newDateTime: null,
        tradeSecurity: '',
        tradeFactor: 10,
        tradeCapacity: 0,
        tradeOpenPr: 0,
        tradeClosePr: 0,
        tradeResult: 0,
        tradeSignals: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    };
    maxTradeNumber = 0;
    componentDidMount() {
        this.fetchData();
        // getDataFromMoex();
    }
    signalNames = ['отбой д7', 'отбой д14', 'отбой ч7', 'отбой ч14', 'паралел', '-ЖЖО-', 'концентр', 'Фибо 62', 'повтор 2т', '-ГИП-'];
    SignalHeader = this.signalNames.map(item => (
        <th key={`SignalHeader${item}`} scope="col">{item}</th>
    ));
    RowOfCheckboxes = (keyForIndex) => {
        for (let i = 0; i < 10; i++) {
            return (
                <td scope="col">{keyForIndex}</td>
            );
        }
    };
    RenderChekboxes = this.signalNames.map(item => (
        <td key={`SignalBoxes${item}`} ><Form.Check custom type='checkbox' id={item} label='' /></td>
    ));
    ParseDate = (dateTimeFromMongo) => {
        const tmpData = new Date(dateTimeFromMongo);
        moment.locale('ru');
        return (moment(tmpData).format('L hh:mm:ss'))
    };
    tradeSecurityCH = (e) => {
        if (e) {
            this.setState({
                tradeSecurity: e.target.value
            });
        }
    };
    tradeCapacityCH = (e) => {
        if (e) {
            this.setState({
                tradeCapacity: e.target.value
            });
        }
    };
    tradeOpenPrCH = (e) => {
        if (e) {
            this.setState({
                tradeOpenPr: e.target.value,
                newDateTime: moment().format('L hh:mm:ss')
            });
        }
    };
    tradeClosePrCH = (e) => {
        if (e) {
            this.setState({
                tradeClosePr: e.target.value,
                tradeResult: (e.target.value - this.state.tradeOpenPr) * this.state.tradeCapacity * this.state.tradeFactor
            });
        }
    };
    fetchData = async () => {
        try {
            const dataFromBase = await fetch(PAGES.API.fetchData.path);
            const tradesInfo = await dataFromBase.json();
            tradesInfo.tradesInfo.sort((a, b) => b.number - a.number);
            tradesInfo.tradesInfo.map((item) => this.maxTradeNumber = Math.max(this.maxTradeNumber, item.number));
            this.maxTradeNumber++;
            this.setState({
                tradesInfo
            });
        } catch (e) {
            console.error(e);
        }
    };
    // addSecurity = async (text, number) => {
    //     const newItem = this.createNewSecurity(text, number);
    //     const { securities } = this.state;
    //     const newArr = [...securities, newItem];
    //     this.setState({
    //         securities: newArr
    //     });
    //     await axios.post('http://localhost:3000/api/upgrade_securities',
    //         { email: 'erk.rauf@gmail.com', securities: newArr });
    // };
    // createNewSecurity(securityLabel, lotsNumber) {
    //     return {
    //         securityLabel, lotsNumber, id: this.maxIdSec++
    //     };
    // }   
    // newDateTime: null,
    // tradeSecurity: '',
    // tradeFactor: 10,
    // tradeCapacity: 0,
    // tradeOpenPr: 0,
    // tradeClosePr: 0,
    // tradeResult: 0,
    // tradeSignals: [], 
    addNewTrade = async (text) => {
        let newTrade = {};
        // const newItem = this.createNewSignal(text);      
        // const { tradesInfo: { tradesInfo }, ...newTrade} = this.state;
        const { tradesInfo: { tradesInfo }, newDateTime, tradeSecurity, tradeFactor, tradeCapacity, tradeOpenPr, tradeClosePr, tradeResult, tradeSignals } = this.state;
        console.log(tradesInfo);
        newTrade['capacity'] = tradeCapacity;
        newTrade['closePrice'] = tradeClosePr;
        newTrade['factor'] = tradeFactor;
        newTrade['number'] = this.maxTradeNumber++;
        newTrade['openPrice'] = tradeOpenPr;
        newTrade['result'] = tradeResult;
        newTrade['security'] = tradeSecurity;
        newTrade['signals'] = tradeSignals;
        newTrade['tradeData'] = newDateTime;
        newTrade['user'] = 'erk.rauf@gmail.com'
        newTrade['__v'] = 0;
        newTrade['_id'] = newDateTime;
        console.log(newTrade);
        const newArr = [newTrade,...tradesInfo];
        console.log('--------------------------------------------------------------');
        console.log(newArr);
        this.setState({
            tradesInfo:{
                tradesInfo:newArr
            }
        });
        await fetch('http://localhost:3000/api/new_trade',
            { email: 'erk.rauf@gmail.com', tradesInfo: newTrade });
    };
    //     capacity: 1
    // closePrice: 100
    // factor: 50
    // number: 1
    // openPrice: 97
    // result: 150
    // security: "BR"
    // signals: (10) [1, 0, 1, 0, 1, 1, 1, 0, 0, 1]
    // tradeData: "2018-06-02T14:23:58.575Z"
    // user: "traider"
    // __v: 0
    // _id: "5c9a0759cfa74f48a30861b9"
    GetDateTimeOnLine() {
        return moment().format('L hh:mm:ss')
    }
    render() {
        const { isAuthenticated, user: { firstName, email } } = this.props.auth;
        const { tradesInfo: { tradesInfo }, newDateTime, tradeFactor } = this.state;
        let keyIndex = 0;
        return (
            <div className="center">
                {/* {!isAuthenticated && <Redirect to='/' />} */}
                <h3><b><i>СДЕЛКИ</i></b></h3>
                {isAuthenticated && <span>Привет, {firstName}!</span>}
                <table className="table table-bordered rounded">
                    <thead className="thead-dark">
                        <tr key={'table header'} align='center'>
                            <th scope="col" className='header-number'>номер</th>
                            <th scope="col" className='header-data'>дата время</th>
                            <th scope="col">актив</th>
                            <th scope="col">лот</th>
                            <th scope="col">кол-во</th>
                            <th scope="col">цена открытия</th>
                            <th scope="col">цена закрытия</th>
                            <th scope="col">итог</th>
                            {this.SignalHeader}
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={'main-table-row'} className='main-table-row'>
                            <td>{this.maxTradeNumber}</td>
                            {/* <td>{this.GetDateTimeOnLine()}</td> */}
                            <td>{this.state.newDateTime}</td>
                            <td><input type="text" className="form-control" placeholder="актив" id='tradeSecurity' onChange={this.tradeSecurityCH} /></td>
                            <td></td>
                            <td><input type="number" className="form-control" placeholder="кол-во" onChange={this.tradeCapacityCH} /></td>
                            <td><input type="number" className="form-control" placeholder="открытие" onChange={this.tradeOpenPrCH} /></td>
                            <td><input type="number" className="form-control" placeholder="закрытие" onChange={this.tradeClosePrCH} /></td>
                            <td>{this.state.tradeResult}</td>
                            {this.RenderChekboxes}
                            <td><button type='button' className='btn btn-success' onClick={this.addNewTrade}>
                                <i className='fa-handshake-o' />
                            </button></td>
                        </tr>
                        {tradesInfo.map(trade => <tr key={trade.number} className='main-table-row'>
                            <td>{trade.number}</td>
                            <td >{this.ParseDate(trade.tradeData)}</td>
                            <td >{trade.security}</td>
                            <td >{trade.factor}</td>
                            <td >{trade.capacity}</td>
                            <td >{trade.openPrice}</td>
                            <td >{trade.closePrice}</td>
                            <td >{trade.result}</td>
                            {trade.signals.map(signal => <td key={keyIndex++} >{signal ? <img src={icon} alt="yes" /> : null}</td>)}
                            <td scope="col" >
                                <button type='button' className='btn btn-danger'>
                                    <i className='fa fa-trash-o' />
                                </button>
                            </td>
                        </tr>)}
                    </tbody>
                </table>
            </div >
        );
    }
}
const mapStatetoProps = state => ({
    auth: state.auth
});
export default connect(mapStatetoProps)(Journal);
