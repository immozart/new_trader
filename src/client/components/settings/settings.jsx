import React, { Component } from 'react';
import axios from 'axios';
import Signals from './todo-list/signals';
import Securities from './todo-list/securities';
import SignalAddForm from './item-add-form/signal-add-form';
import SecurityAddForm from './item-add-form/security-add-form';
import './settings.css';

class Settings extends Component {
  maxIdSig = 100;

  maxIdSec = 100;

  createNewSignal(signalLabel) {
    return {
      signalLabel, id: this.maxIdSig++
    };
  }

  createNewSecurity(securityLabel, lotsNumber) {
    return {
      securityLabel, lotsNumber, id: this.maxIdSec++
    };
  }

  state = {
    signals: [],
    securities: [],
    signal: '',
    security: ''
  };

  getInfo = async () => {
    const { data } = await axios.post('http://localhost:3000/api/settings',
      { email: 'erk.rauf@gmail.com' });
    const { signals, securities } = data;
    this.setState({
      signals,
      securities
    });
  }

  componentDidMount() {
    this.getInfo();
  }

  deleteSignal = async (id) => {
    const { signals } = this.state;
    const idx = signals.findIndex(el => el.id === id);
    const before = signals.slice(0, idx);
    const after = signals.slice(idx + 1);
    this.setState({
      signals: [...before, ...after]
    });
    await axios.post('http://localhost:3000/api/upgrade_signals',
      { email: 'erk.rauf@gmail.com', signals: [...before, ...after] });
  }

  deleteSecurity = async (id) => {
    const { securities } = this.state;
    const idx = securities.findIndex(el => el.id === id);
    const before = securities.slice(0, idx);
    const after = securities.slice(idx + 1);
    this.setState({
      securities: [...before, ...after]
    });
    await axios.post('http://localhost:3000/api/upgrade_securities',
      { email: 'erk.rauf@gmail.com', securities: [...before, ...after] });
  }

  addSignal = async (text) => {
    const newItem = this.createNewSignal(text);
    const { signals } = this.state;
    const newArr = [...signals, newItem];
    this.setState({
      signals: newArr
    });
    await axios.post('http://localhost:3000/api/upgrade_signals',
      { email: 'erk.rauf@gmail.com', signals: newArr });
  };

  addSecurity = async (text, number) => {
    const newItem = this.createNewSecurity(text, number);
    const { securities } = this.state;
    const newArr = [...securities, newItem];
    this.setState({
      securities: newArr
    });
    await axios.post('http://localhost:3000/api/upgrade_securities',
      { email: 'erk.rauf@gmail.com', securities: newArr });
  };

  render() {
    return (<div className="settings">
      <div className="form-group">
        <h1>Мои торговые сигналы</h1>
        <SignalAddForm
          addSignal={this.addSignal} /><br></br>
        <Signals
          signalItems={this.state.signals}
          onDeletedSignal={this.deleteSignal} />
      </div>


      <div className="form-group papers">
        <h1>Мои торгуемые бумаги</h1>
        <SecurityAddForm
          addSecurity={this.addSecurity} /><br></br>
        <Securities
          securityItems={this.state.securities}
          onDeletedSecurity={this.deleteSecurity} />
      </div>
    </div>);
  }
}

export default Settings;
