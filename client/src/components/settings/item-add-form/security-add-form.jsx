import React, { Component } from 'react';
import './item-add-form.css';

class SecurityAddForm extends Component {
  state = {
    securityLabel: '',
    lotsNumber: ''
  };

  onLabelChange = (e) => {
    this.setState({
      securityLabel: e.target.value
    });
  };

  onLotsChange = (e) => {
    this.setState({
      lotsNumber: e.target.value
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.addSecurity(this.state.securityLabel, this.state.lotsNumber);
    this.setState({
      securityLabel: '',
      lotsNumber: ''
    });
  };

  render() {
    return (<form className="input"
      
      onSubmit={this.onSubmit}>
      <button
        className="btn btn-success"
        onClick={() => this.onLabelChange}>
        Добавить
      </button>
      <input
        type="text"
        className="form-control"
        placeholder="Название"
        onChange={this.onLabelChange}
        value={this.state.securityLabel} />
      <input
        type="text"
        className="form-control"
        placeholder="Количество лотов"
        onChange={this.onLotsChange}
        value={this.state.lotsNumber} />
    </form>);
  }
}

export default SecurityAddForm;
