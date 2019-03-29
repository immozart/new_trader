import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUserAC } from '../../redux/actions/auth-actions';
import './navbar.css';

class NavBar extends Component {
  onLogout = (e) => {
    e.preventDefault();
    this.props.logoutUserAC();
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">

        {this.props.auth.isAuthenticated
          && <Link className="navbar-brand" to="/journal"><b>Trader's Journal</b></Link>}

        {!this.props.auth.isAuthenticated
          && <Link className="navbar-brand" to="/"><b>Trader's Journal</b></Link>}

        <div className="collapse navbar-collapse" id="navbarColor02">

          {this.props.auth.isAuthenticated && <ul className="navbar-nav mr-auto">
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
        
        {!this.props.auth.isAuthenticated
          && <div>
            <Link to="/login">
              <button className="btn btn-danger">Войти</button>
            </Link>
            <Link to="/registration">
              <button className="btn btn-warning enter">Зарегистрироваться</button>
            </Link>
          </div>}

        {this.props.auth.isAuthenticated
          && <div>
            <Link to="/">
              <button className="btn btn-warning enter" onClick={this.onLogout}>Выйти</button>
            </Link>
          </div>}
        
      </nav>
    );
  }
}

NavBar.propTypes = {
  logoutUserAC: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUserAC })(NavBar);
