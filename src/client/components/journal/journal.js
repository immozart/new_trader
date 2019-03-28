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
        moexFactor: 10,
        tradeCapacity: 1,
        tradeOpenPr: 0,
        tradeClosePr: 0,
        tradeResult: 0,
        tradeSignals: []
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
    getDataFromMoex = async (argSecc) => {
        try {
            if (argSecc.length == 4) {
                console.log('---------------------------------------------------------' + argSecc);
                const dataFromMoex = await fetch('https://iss.moex.com/iss/engines/stock/markets/shares/securities/' + argSecc + '.json');
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
    onSecNameChange = (e,argId) => {
        if (e) {
            // this.getDataFromMoex(e.target.value);
            console.log('-----------------------------------------')
            console.log(argId)
            console.log('-----------------------------------------')
            this.setState({
                newDateTime: e.target.value
            });
        }
    };
    GetDateTimeOnLine() {
        return moment().format('L hh:mm:ss')
    }
    render() {
        const { isAuthenticated, user: { firstName, email } } = this.props.auth;
        const { tradesInfo: { tradesInfo }, newDateTime, moexFactor } = this.state;
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
                            <td>{this.GetDateTimeOnLine()}</td>
                            <td><input type="text" className="form-control" placeholder="актив" id='tradeSecurity' onChange={this.onSecNameChange} /></td>
                            <td>{moexFactor}</td>
                            <td><input type="number" className="form-control" value='0' onChange={this.onSecNameChange} /></td>
                            <td><input type="number" className="form-control" placeholder="цена открытия" /></td>
                            <td><input type="number" className="form-control" placeholder="цена закрытия" /></td>
                            <td>0123456</td>
                            {this.RenderChekboxes}
                            <td><button type='button' className='btn btn-success'>
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
