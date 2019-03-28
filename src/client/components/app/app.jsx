import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Type from 'prop-types';
import axios from 'axios';
import { bemClassNameFactory } from '../../utils/bem';
import NavBar from '../navbar/navbar';
import './app.css';


const cn = bemClassNameFactory('app');

export default class App extends Component {
  static propTypes = {
    appName: Type.string,
    children: Type.node.isRequired
  };

  static defaultProps = {
    appName: 'Default Name'
  };

  state = {
    session: {}
  }

  getSession = async () => {
    const { data } = await axios.get('http://localhost:3000/api/');
    this.setState({
      session: data.session
    });
  }

  componentDidMount() {
    this.getSession();
  }

  render() {
    const {
      children
    } = this.props;
    return (
      <div className={cn()} >
        <div className={cn('header')}>
          {<NavBar />}
        </div>
        {children}
        <div className={cn('footer')}>
        </div>
      </div >
    );
  }
}
