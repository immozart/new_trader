import React, { Component } from 'react';
import Type from 'prop-types';
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

  render() {
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
