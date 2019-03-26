import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import './navbar.css';

class NavBar extends Component {

  state = {
    user: '1'
  };

  async componentDidMount() {
    const { data } = await axios.get('http://localhost:3001/');
    console.log('data is', data);
    this.setState({
      user: data
    });
  }


  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <Link className="navbar-brand" to="/">Trader's Journal</Link>

        <div className="collapse navbar-collapse" id="navbarColor02">

          {this.state.user && <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/trades">Журнал</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/statistic">Статистика</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/settings">Настройки</Link>
            </li>
          </ul>}

        </div>

        <div>
          <Link to="/login">
            <button className="btn btn-secondary">Войти</button>
          </Link>
          <Link to="/registration">
            <button className="btn btn-success enter">Зарегистрироваться</button>
          </Link>
        </div>
      </nav>
    );
  }
}

export default NavBar;
