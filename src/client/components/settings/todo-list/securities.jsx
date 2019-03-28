import React from 'react';
import SecurityListItem from '../todo-list-item/security-list-item';
import './todo-list.css';

const Securities = ({ securityItems, onDeletedSecurity }) => {
  const elements = securityItems.map((item) => {
    const { id, ...itemProps } = item;
    return (
      <li key={id}>
        <SecurityListItem
          {...itemProps}
          onDeletedSecurity={() => onDeletedSecurity(id)}/>
      </li>
    );
  });

  return (
    <ul>
      {elements}
    </ul>
  );
};

export default Securities;
