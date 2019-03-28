import React, { Component } from 'react';
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

  createNewSecurity(signalSecurity) {
    return {
      signalSecurity, id: this.maxIdSec++
    };
  }

  state = {
    signals: [],
    securities: [],
    signal: '',
    security: ''
  };

  deleteSignal = (id) => {
    this.setState(({ signals }) => {
      const idx = signals.findIndex(el => el.id === id);

      const before = signals.slice(0, idx);
      const after = signals.slice(idx + 1);

      return {
        signals: [...before, ...after]
      };
    });
  };

  deleteSecurity = (id) => {
    this.setState(({ securities }) => {
      const idx = securities.findIndex(el => el.id === id);

      const before = securities.slice(0, idx);
      const after = securities.slice(idx + 1);

      return {
        securities: [...before, ...after]
      };
    });
  };

  addSignal = (text) => {
    const newItem = this.createNewSignal(text);

    this.setState(({ signals }) => {
      const newArr = [...signals, newItem];

      return {
        signals: newArr
      };
    });
  };

  addSecurity = (text) => {
    const newItem = this.createNewSecurity(text);

    this.setState(({ securities }) => {
      const newArr = [...securities, newItem];

      return {
        securities: newArr
      };
    });
  };


  render() {
    return (<div className="settings">
      <div className="form-group">
        <legend>Мои торговые сигналы</legend>
        <Signals
          signalItems={this.state.signals}
          onDeletedSignal={this.deleteSignal} />
        <SignalAddForm
          addSignal={this.addSignal} />
      </div>
      <div className="form-group papers">
      <legend>Мои торгуемые бумаги</legend>
        <Securities
          securityItems={this.state.securities}
          onDeletedSecurity={this.deleteSecurity} />
        <SecurityAddForm
          addSecurity={this.addSecurity} />
      </div>
    </div>);
  }
}

export default Settings;
