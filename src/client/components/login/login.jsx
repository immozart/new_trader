import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUserAC } from '../../redux/actions/auth-actions';
import './login.css';

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard'); // push user to dashboard when they login
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUserAC(userData, this.props.history);
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
              onChange={this.onChange} value={this.state.email} />
            {<div className="invalid-feedback">{email}</div>}
          </div>

          <div className="form-group has-danger">
            <label htmlFor="password">Пароль</label>
            <input type="password"
              className={password ? 'form-control is-invalid' : 'form-control'} id="password"
              placeholder="например, **********"
              onChange={this.onChange} value={this.state.password} />
            {<div className="invalid-feedback">{password}</div>}
          </div>

          <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>Войти</button>
        </fieldset>
      </form>
    );
  }
}

Login.propTypes = {
  loginUserAC: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUserAC })(withRouter(Login));
