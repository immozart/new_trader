import React, { Component } from 'react';
import axios from 'axios';
import './login.css';

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {}
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
    const { data } = await axios.post('http://localhost:3000/api/login',
      {
        email: this.state.email,
        password: this.state.password
      },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      });

    if (data.errors) {
      this.setState({
        errors: {
          email: data.errors.email,
          password: data.errors.password
        }
      });
    }

    if (data.success) {
      this.setState({
        errors: {}
      });
      this.props.history.push('/');
    }
  }


  render() {
    const { email, password } = this.state.errors;

    return (
      <form className="login">
        <fieldset>
          <legend>Вход в Trader's Journal</legend>

          <div className="form-group has-danger">
            <label htmlFor="email">Электронная почта</label>
            <input type="email"
              className={email ? 'form-control is-invalid' : 'form-control'} id="email"
              placeholder="например, rauf.erk@gmail.com"
              onChange={this.getEmail} value={this.state.email} />
            {<div className="invalid-feedback">{email}</div>}
          </div>

          <div className="form-group has-danger">
            <label htmlFor="password">Пароль</label>
            <input type="password"
              className={password ? 'form-control is-invalid' : 'form-control'} id="password"
              placeholder="например, **********"
              onChange={this.getPassword} value={this.state.password} />
            {<div className="invalid-feedback">{password}</div>}
          </div>

          <button type="submit" className="btn btn-primary" onClick={this.submit}>Войти</button>
        </fieldset>
      </form>
    );
  }
}

export default Login;
