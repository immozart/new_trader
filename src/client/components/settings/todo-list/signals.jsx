import React from 'react';
import SignalListItem from '../todo-list-item/signal-list-item';
import './todo-list.css';

const Signals = ({ signalItems, onDeletedSignal }) => {
  const elements = signalItems.map((item) => {
    const { id, ...itemProps } = item;
    return (
      <li key={id}>
        <SignalListItem
          {...itemProps}
          onDeletedSignal={() => onDeletedSignal(id)}/>
      </li>
    );
  });

  return (
    <ul>
      {elements}
    </ul>
  );
};

export default Signals;
