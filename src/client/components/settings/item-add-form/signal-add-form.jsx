import React, { Component } from 'react';
import './item-add-form.css';

class SignalAddForm extends Component {
  state = {
    signalLabel: ''
  };

  onLabelChange = (e) => {
    this.setState({
      signalLabel: e.target.value
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.addSignal(this.state.signalLabel);
    this.setState({
      signalLabel: ''
    });
  };

  render() {
    return (<form
      onSubmit={this.onSubmit}>
      <button
        onClick={() => this.onLabelChange}>
        Добавить
      </button>
      <input
        type="text"
        onChange={this.onLabelChange}
      value={this.state.signalLabel}/>
    </form>);
  }
}

export default SignalAddForm;
