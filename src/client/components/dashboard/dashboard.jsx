import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Dashboard extends Component {
  render() {
    return (
      <div>
        {!this.props.auth.isAuthenticated && <Redirect to='/' />}
        {this.props.auth.isAuthenticated && <div>Привет, {this.props.auth.user.firstName}!</div>}
      </div>
    );
  }
}

// Dashboard.propTypes = {
//   auth: PropTypes.object.isRequired
// };

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Dashboard);
