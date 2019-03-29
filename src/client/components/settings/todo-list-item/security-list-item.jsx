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
      <span>
        <span>
          {securityLabel} {lotsNumber}
        </span>
        <button
          onClick={onDeletedSecurity}>Удалить</button>
      </span>
    );
  }
}

export default SecurityListItem;
