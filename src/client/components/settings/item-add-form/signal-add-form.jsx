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
    return (<form className="signals"
      onSubmit={this.onSubmit}>
      <button
        className="btn btn-success"
        onClick={() => this.onLabelChange}>
        Добавить
      </button>
      <input
        type="text"
        className="form-control"
        onChange={this.onLabelChange}
        value={this.state.signalLabel} />
    </form>);
  }
}

export default SignalAddForm;
