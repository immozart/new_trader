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

  getSession = async () => {
    const { data } = await axios.get('http://localhost:3000/api/');
    return data.session;
  }

  render() {
    if (this.getSession() === undefined) {
      console.log(this.getSession())
      return (
        <div>
          привет!
        </div>
      );
    }
    const {
      children
    } = this.props;
    return (

      <div className={cn()}>
        <div className={cn('header')}>
          {<NavBar />}
        </div>
        {children}
        <div className={cn('footer')}>
        </div>
      </div>
    );
  }
}
