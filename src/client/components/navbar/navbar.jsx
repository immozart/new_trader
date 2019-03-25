import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import './navbar.css';

class NavBar extends Component {

  state = {
    user: '1'
  };

  async componentDidMount() {
    const { data } = await axios.get('http://localhost:3000/api');
    console.log('data is', data);
    this.setState({
      user: data
    });
  }


  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <Link className="navbar-brand" to="/"><b>Trader's Journal</b></Link>

        <div className="collapse navbar-collapse" id="navbarColor02">

          {this.state.user && <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/journal">Журнал</Link>
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
            <button className="btn btn-dark">Войти</button>
          </Link>
          <Link to="/registration">
            <button className="btn btn-warning enter">Зарегистрироваться</button>
          </Link>
        </div>
      </nav>
    );
  }
}

export default NavBar;
