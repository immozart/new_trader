import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUserAC } from '../../redux/actions/auth-actions';
import './registration.css';


class Registration extends Component {
  state = {
    firstName: '',
    email: '',
    password: '',
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
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
    const newUser = {
      firstName: this.state.firstName,
      email: this.state.email,
      password: this.state.password
    };
    this.props.registerUserAC(newUser, this.props.history);
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
              onChange={this.onChange} value={this.state.firstName} />
            {<div className="invalid-feedback">{firstName}</div>}
          </div>

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
          <button type="submit" className="btn btn-primary"
            onClick={this.onSubmit}>Создать новый аккаунт
          </button>
        </fieldset>
      </form>
    );
  }
}

Registration.propTypes = {
  registerUserAC: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStatetoProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStatetoProps, { registerUserAC })(withRouter(Registration));
