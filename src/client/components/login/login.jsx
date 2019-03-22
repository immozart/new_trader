import React, { Component } from 'react';
import './login.css';

class Login extends Component {
  render() {
    return (
      <form className="login">
        <fieldset>
          <legend>Вход в Traider's Journal</legend>
          <div className="form-group">
            <label htmlFor="email" className="col-sm-2 col-form-label">Электронная почта</label>
            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="например, rauf.erk@gmail.com"></input>
          </div>
          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input type="password" className="form-control" id="password" placeholder="например, ********"></input>
          </div>
          <button type="submit" className="btn btn-primary">Войти</button>
        </fieldset>
      </form>
    );
  }
}

export default Login;
