import React, { Component } from 'react';
import './todo-list-item.css';

class SignalListItem extends Component {
  render() {
    const {
      signalLabel,
      onDeletedSignal
    } = this.props;

    return (
      <span>
        <span>
          {signalLabel}
        </span>
        <button
          onClick={onDeletedSignal}>Удалить</button>
      </span>
    );
  }
}

export default SignalListItem;
