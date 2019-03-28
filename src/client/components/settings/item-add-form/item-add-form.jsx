import React, {Component} from 'react';
import './item-add-form.css';

class ItemAddForm extends Component {

  state = {
    label: ''
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value
    })
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.addItem(this.state.label);
    this.setState({
      label: ''
    })
  };

  render() {
    return (<form
      onSubmit={this.onSubmit}>
      <button
        onClick={() => this.onLabelChange}>
        Add Item
      </button>
      <input
        type="text"
        onChange={this.onLabelChange}
      value={this.state.label}/>
    </form>)
  }
}

export default ItemAddForm;