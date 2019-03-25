import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import './registration.css';


class Registration extends Component {
  state = {
    firstName: '',
    email: '',
    password: '',
    error: {}
  };

  getFirstName = (e) => {
    this.setState({
      firstName: e.target.value
    });
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

    const { data } = await axios.post('http://localhost:3000/api/registration',
      {
        firstName: this.state.firstName,
        email: this.state.email,
        password: this.state.password
      }, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      });

    if (data.errors) {
      const { firstName, email, password } = data.errors;

      this.setState({
        error: {
          firstName: firstName ? 'Введите, пожалуйста, ваше Имя.' : '',
          email: email ? 'Введите, пожалуйста, вашу Электронную почту.' : '',
          password: password ? 'Введите, пожалуйста, ваш Пароль.' : ''
        }
      });
    }

    if (data.code === 11000) {
      this.setState({
        error: { email: 'Пользователь с такой электронной почтой уже существует в системе.' }
      });
    }

    if (data === 'successfully') {
      console.log(data);
      this.setState({
        error: {}
      });
      this.props.history.replace('/');
    }
  };


  render() {
    const { firstName, email, password } = this.state.error;

    return (
      <form className="registration">
        <fieldset>
          <legend>Создайте аккаунт в Trader's Journal</legend>
          <p>или <Link to="/login">войдите в свой аккаунт</Link></p>

          <div className="form-group has-danger">
            <label htmlFor="firstName" className="form-control-label">Имя</label>
            <input type="text"
                   className={firstName ? 'form-control is-invalid' : 'form-control'} id="firstName"
                   placeholder="например, Рауф Эрк"
                   onChange={this.getFirstName} value={this.state.firstName}/>
            {<div className="invalid-feedback">{firstName}</div>}
          </div>

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
          <button type="submit" className="btn btn-primary"
                  onClick={this.submit}>Создать новый аккаунт
          </button>
        </fieldset>
      </form>
    );
  }
}

export default withRouter(Registration);
