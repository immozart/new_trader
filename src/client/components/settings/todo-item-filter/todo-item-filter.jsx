import React from 'react';

class TodoItemFilter extends React.Component {
  render() {
    return (
      <div>
        <button type="button">All</button>
        <button type="button">Active</button>
        <button type="button">Done</button>
      </div>
    )
  }
}

export default TodoItemFilter;