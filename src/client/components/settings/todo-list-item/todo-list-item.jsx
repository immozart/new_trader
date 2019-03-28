import React, {Component} from 'react';
import './todo-list-item.css';

class TodoListItem extends Component {

  render() {
    const {
      label,
      onDeleted,
      onToggleImportant,
      onToggleDone,
      done,
      important
    } = this.props;

    const style = {
      color: important ? 'red' : 'blue'
    };

    let classNames = "";
    if (done) {
      classNames += " done"
    }

    if (important) {
      classNames += " important"
    }

    return (
      <span>
      <span
        className={classNames}
        style={style}
        onClick={onToggleDone}>
      {label}

    </span>
      <button
        onClick={onToggleImportant}>
        !!!</button>

        <button
          onClick={onDeleted}>Del</button>
      </span>
    )

  }
}

export default TodoListItem;