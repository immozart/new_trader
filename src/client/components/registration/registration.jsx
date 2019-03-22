import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './registration.css';

class Registration extends Component {
  render() {
    return (
      <form className="registration">
        <fieldset>
          <legend>Создать аккаунт в Traider's Journal</legend>
          <p>или <Link to="/login">войдите в свой аккаунт</Link></p>
          <div className="form-group row">
            <label htmlFor="firstName" className="col-sm-2 col-form-label">Имя</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="например, Рауф Эрк"></input>
          </div>
          <div className="form-group">
            <label htmlFor="email" className="col-sm-2 col-form-label">Электронная почта</label>
            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="например, rauf.erk@gmail.com"></input>
          </div>
          <div className="form-group">
            <label for="password">Пароль</label>
            <input type="password" className="form-control" id="password" placeholder="например, ********"></input>
          </div>
          <button type="submit" className="btn btn-primary">Создать новый аккаунт</button>
        </fieldset>
      </form>
    );
  }
}

export default Registration;
