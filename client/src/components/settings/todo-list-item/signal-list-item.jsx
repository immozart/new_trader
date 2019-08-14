import React, { Component } from 'react';
import './todo-list-item.css';

class SignalListItem extends Component {
  render() {
    const {
      signalLabel,
      onDeletedSignal
    } = this.props;

    return (
      <span className="paper-input">
        <h2>
          {signalLabel}
        </h2>
        <button
          className="btn btn-danger"
          onClick={onDeletedSignal}>Удалить</button>
      </span>
    );
  }
}

export default SignalListItem;
