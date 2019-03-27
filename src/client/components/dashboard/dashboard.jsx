import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUserAC } from '../../redux/actions/auth-actions';

class Dashboard extends Component {
  onLogout = (e) => {
    e.preventDefault();
    this.props.logoutUserAC();
  }

  render() {
    // const { user } = this.props.auth;

    return (
      <div>привет!</div>
    );
  }
}

Dashboard.propTypes = {
  logoutUserAC: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUserAC })(Dashboard);
