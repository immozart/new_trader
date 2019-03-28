import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PAGES } from '../../routes/pages';
import icon from '../../public/images/checkmark-16.png';
import './journal.css'
import { Button, ButtonGroup, Form } from 'react-bootstrap';


class Journal extends Component {
    state = {
      tradesInfo: {
        tradesInfo: []
      }
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

    componentDidMount() {
      console.log(this.props);
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
        <div className="col" key={`Chekboxes${item}`} >
            <input type="text" className="form-control" placeholder={item} />
        </div>
    ));

    ParseDate = (dateTimeFromMongo) => {
      const tmpData = new Date(dateTimeFromMongo);
      return (tmpData.toLocaleString()
      );
    };
    onLabelChange = (e) => {
        this.setState({
            label: e.target.value
        });
    };
    onSubmit = (e) => {
        e.preventDefault();
        this.props.onItemAdded(this.state.label);
        this.setState({ label: '' })
    }
    render() {
      const { isAuthenticated, user: { firstName, email } } = this.props.auth;
      const { tradesInfo } = this.state.tradesInfo;
      let keyIndex = 0;
      let maxTradeNumber = tradesInfo.length;
      return (
            <div className="center">
                {/* {!isAuthenticated && <Redirect to='/' />} */}
                {isAuthenticated && <div>Привет, {firstName}!</div>}
                <h3><b><i>СДЕЛКИ</i></b></h3>
                <table className="table table-bordered rounded">
                    <thead className="thead-dark">
                        <tr key={'table headernpm'} align='center'>
                            <th scope="col" className='header-number'>номер</th>
                            <th scope="col" className='header-data'>время открытия</th>
                            <th scope="col">актив</th>
                            <th scope="col">лот</th>
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
                            <td><input type="text" className="form-control" placeholder="время открытия" onChange={this.onLabelChange} /></td>
                            <td><input type="text" className="form-control" placeholder="актив" /></td>
                            <td><input type="text" className="form-control" placeholder="лот" /></td>
                            <td><input type="text" className="form-control" placeholder="цена открытия" /></td>
                            <td><input type="text" className="form-control" placeholder="цена закрытия" /></td>
                            <td><input type="text" className="form-control" placeholder="итог" /></td>
                            <td><Form.Check custom type='checkbox' id='custom-checkbox1' label='' /></td>
                            <td><Form.Check custom type='checkbox' id='custom-checkbox2' label='' /></td>
                            <td><Form.Check custom type='checkbox' id='custom-checkbox3' label='' /></td>
                            <td><Form.Check custom type='checkbox' id='custom-checkbox4' label='' /></td>
                            <td><Form.Check custom type='checkbox' id='custom-checkbox5' label='' /></td>
                            <td><Form.Check custom type='checkbox' id='custom-checkbox6' label='' /></td>
                            <td><Form.Check custom type='checkbox' id='custom-checkbox7' label='' /></td>
                            <td><Form.Check custom type='checkbox' id='custom-checkbox8' label='' /></td>
                            <td><Form.Check custom type='checkbox' id='custom-checkbox9' label='' /></td>
                            <td><Form.Check custom type='checkbox' id='custom-checkbox10' label='' /></td>
                            <td><button type='button' className='btn btn-success'>
                                <i className='fa-handshake-o' />
                            </button></td>
                        </tr>

                        {tradesInfo.map(trade => <tr key={trade.number} className='main-table-row'>
                            <td>{trade.number}</td>
                            <td >{this.ParseDate(trade.tradeData)}</td>
                            <td >{trade.security}</td>
                            <td >{trade.factor}</td>
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
