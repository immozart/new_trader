import React, {Component} from 'react';
import AppHeader from './app-header';
import SearchPanel from './search-panel';
import TodoList from './todo-list';
import TodoItemFilter from './todo-item-filter';
import ItemAddForm from './item-add-form';
import './settings.css';

class Settings extends Component {

  maxId = 100;

  createNewItem(label) {
    return {
      label, important: false, done: false, id: this.maxId++
    }
  };

  state = {
    todoData: [
      this.createNewItem('Make Coffee', 1),
      this.createNewItem('Build App', 2),
      this.createNewItem('Drink Whisky', 3)
    ],
    term: ''
  };

  deleteItem = (id) => {
    this.setState(({todoData}) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const before = todoData.slice(0, idx);
      const after = todoData.slice(idx + 1);

      return {
        todoData: [...before, ...after]
      };
    });
  };

  addItem = (text) => {
    const newItem = this.createNewItem(text);

    this.setState(({todoData}) => {
      const newArr = [...todoData, newItem];

      return {
        todoData: newArr
      }
    });
  };

  toggleProperties(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);

    const oldItem = arr[idx];
    const newItem = {...oldItem, [propName]: !oldItem[propName]};

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }


  onToggleDone = (id) => {

    this.setState(({todoData}) => {

      return {
        todoData: this.toggleProperties(todoData, id, 'done')
      }
    });

  };

  onToggleImportant = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperties(todoData, id, 'important')
      }
    });
  };

  search(items, term) {
    if (term.length === 0) {
      return items;
    }
    return items.filter(item => item.label.indexOf(term) > -1)
  }

  onSearchPanel = (term) => {
    this.setState({term})
  };


  render() {

    const {todoData, term} = this.state;

    const visibleItems = this.search(todoData, term);

    const doneCount = todoData.filter((el) => el.done).length;

    const todoCount = todoData.length - doneCount;

    return (<div>
      <AppHeader todo={todoCount} done={doneCount}/>
      <SearchPanel onSearchPanel={this.onSearchPanel}/>
      <TodoItemFilter/>
      <TodoList
        todoItems={visibleItems}
        onDeleted={this.deleteItem}
        onToggleImportant={this.onToggleImportant}
        onToggleDone={this.onToggleDone}/>
      <ItemAddForm
        addItem={this.addItem}/>
    </div>)
  }
}


export default Settings;