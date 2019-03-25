import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './registration.css';


class Registration extends Component {
  state = {
    firstName: '',
    email: '',
    password: '',
    errors: {}
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

    const { firstName, email, password } = this.state;

    const { data } = await axios.post('http://localhost:3000/api/registration',
      {
        firstName,
        email,
        password
      }, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      });

    if (data.errors) {
      this.setState({
        errors: {
          firstName: data.errors.firstName,
          email: data.errors.email,
          password: data.errors.password
        }
      });
    }

    // eslint-disable-next-line no-underscore-dangle
    if (data._id) {
      this.props.history.push('/');
    }
  };


  render() {
    const { firstName, email, password } = this.state.errors;

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
              onChange={this.getFirstName} value={this.state.firstName} />
            {<div className="invalid-feedback">{firstName}</div>}
          </div>

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
          <button type="submit" className="btn btn-primary"
            onClick={this.submit}>Создать новый аккаунт
          </button>
        </fieldset>
      </form>
    );
  }
}

export default Registration;
