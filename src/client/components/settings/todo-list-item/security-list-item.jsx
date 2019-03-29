import React, { Component } from 'react';
import './todo-list-item.css';

class SecurityListItem extends Component {
  render() {
    const {
      securityLabel,
      lotsNumber,
      onDeletedSecurity
    } = this.props;

    return (
      <span className="paper-input">
        <h2>
          {securityLabel}: {lotsNumber}шт.
        </h2>

        <button
          className="btn btn-danger"
          onClick={onDeletedSecurity}>Удалить</button>
      </span>
    );
  }
}

export default SecurityListItem;
