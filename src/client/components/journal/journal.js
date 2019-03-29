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
        tradeSignals: [],
    };
    fetchData = async () => {
        try {
            const dataFromBase = await fetch(PAGES.API.fetchData.path);
            const tradesInfo = await dataFromBase.json();
            tradesInfo.tradesInfo.sort((a, b) => b.number - a.number);
            this.setState({
                tradesInfo
            });
        } catch (e) {
            console.error(e);
        }
    };
    getDataFromMoex = async () => {
        try {
            if (argSecc.length == 4) {
                console.log('---------------------------------------------------------');
                const dataFromMoex = await fetch('https://iss.moex.com/iss/engines/stock/markets/shares/securities/sber.json');
                const moexJson = await dataFromMoex.json();
                const parsedMoexJson = await JSON.parse(moexJson);
                console.log(parsedMoexJson);
                moexFactor = parsedMoexJson['securities']['data'][1][4];
                console.log('---------------------------------------------------------' + moexFactor);
                this.setState({
                    moexFactor
                });
            }
        } catch (e) {
            console.error(e);
        }
    };
    componentDidMount() {
        this.fetchData();
        // getDataFromMoex();
    }
    signalNames = ['sig_1', 'sig_2', 'sig_3', 'sig_4', 'sig_5', 'sig_6', 'sig_7', 'sig_8', 'sig_9', 'sig_10'];

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
    // newDateTime: null,
    // tradeSecurity: '',
    // tradeFactor: 1,
    // tradeCapacity: 0,
    // tradeOpenPr: 0,
    // tradeClosePr: 0,
    // tradeResult: 0,
    // tradeSignals: [],
    // noLabelChange = (stateParameter,e) => {
    //     if (e) {
    //         this.setState({
    //             [stateParameter]: e.target.value
    //         });
    //     }
    // };
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
    addNewTrade =()=> {

    }
    GetDateTimeOnLine() {
        return moment().format('L hh:mm:ss')
    }
    render() {
        const { isAuthenticated, user: { firstName, email } } = this.props.auth;
        const { tradesInfo: { tradesInfo }, newDateTime, tradeFactor } = this.state;
        let keyIndex = 0;
        let maxTradeNumber = tradesInfo.length;
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
                            <td>{++maxTradeNumber}</td>
                            {/* <td>{this.GetDateTimeOnLine()}</td> */}
                            <td>{this.state.newDateTime}</td>
                            <td>{this.state.tradeSecurity}<input type="text" className="form-control" placeholder="актив" id='tradeSecurity' onChange={this.tradeSecurityCH} /></td>
                            <td>{this.state.tradeFactor}</td>
                            <td>{this.state.tradeCapacity}<input type="number" className="form-control" placeholder="кол-во" onChange={this.tradeCapacityCH} /></td>
                            <td>{this.state.tradeOpenPr}<input type="number" className="form-control" placeholder="открытие" onChange={this.tradeOpenPrCH} /></td>
                            <td>{this.state.tradeClosePr}<input type="number" className="form-control" placeholder="закрытие" onChange={this.tradeClosePrCH} /></td>
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
