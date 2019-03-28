import React, { Component } from 'react';
import './todo-list-item.css';

class SecurityListItem extends Component {
  render() {
    const {
      securityLabel,
      onDeletedSecurity
    } = this.props;

    return (
      <span>
        <span>
          {securityLabel}
        </span>
        <button
          onClick={onDeletedSecurity}>Удалить</button>
      </span>
    );
  }
}

export default SecurityListItem;
