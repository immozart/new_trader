import React from 'react';
import TodoListItem from '../todo-list-item/todo-list-item';
import './todo-list.css';

const TodoList = ({todoItems, onDeleted, onToggleDone, onToggleImportant}) => {

  const elements = todoItems.map((item) => {
    const {id, ...itemProps} = item;
    return (
      <li key={id}>
        <TodoListItem
          {...itemProps}
          onToggleDone={() => onToggleDone(id)}
          onToggleImportant={() => onToggleImportant(id)}
          onDeleted={() => onDeleted(id)}/>
      </li>
    )
  });

  return (
    <ul>
      {elements}
    </ul>
  )
};

export default TodoList;