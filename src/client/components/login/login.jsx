import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import './login.css';

class Login extends Component {
  state = {
    email: '',
    password: '',
    error: {}
  };

  getEmail = (e) => {
    this.setState({
      email: e.target.value
    });
  };

  getPassword = (e) => {
    this.setState({
      password: e.target.value
    });
  };

  submit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post('http://localhost:3001/login',
      {
        email: this.state.email,
        password: this.state.password
      }, {
        headers:
          {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          }
      });

    console.log(data);

    if (data.email) {
      this.setState({
        error: data
      });
    }

    if (data.password) {
      this.setState({
        error: data
      });
    }

    if (data === false) {
      this.setState({
        error: { password: 'Вы ввели неправильный пароль.' }
      });
    }

    if (data === true) {
      this.setState({
        error: {}
      });
      this.props.history.replace('/journal')
    }
  };

  render() {
    const { email, password } = this.state.error;


    return (
      <form className="login">
        <fieldset>
          <legend>Вход в Trader's Journal</legend>

          <div className="form-group has-danger">
            <label htmlFor="email">Электронная почта</label>
            <input type="email"
                   className={email ? 'form-control is-invalid' : 'form-control'} id="email"
                   placeholder="например, rauf.erk@gmail.com"
                   onChange={this.getEmail} value={this.state.email}/>
            {<div className="invalid-feedback">{email}</div>}
          </div>

          <div className="form-group has-danger">
            <label htmlFor="password">Пароль</label>
            <input type="password"
                   className={password ? 'form-control is-invalid' : 'form-control'} id="password"
                   placeholder="например, **********"
                   onChange={this.getPassword} value={this.state.password}/>
            {<div className="invalid-feedback">{password}</div>}
          </div>

          <button type="submit" className="btn btn-primary" onClick={this.submit}>Войти</button>
        </fieldset>
      </form>
    );
  }
}

export default withRouter(Login);
