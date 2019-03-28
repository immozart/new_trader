import React, { Component } from 'react';
import './item-add-form.css';

class SecurityAddForm extends Component {
  state = {
    securityLabel: ''
  };

  onLabelChange = (e) => {
    this.setState({
      securityLabel: e.target.value
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.addSecurity(this.state.securityLabel);
    this.setState({
      securityLabel: ''
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
      value={this.state.securityLabel}/>
    </form>);
  }
}

export default SecurityAddForm;
