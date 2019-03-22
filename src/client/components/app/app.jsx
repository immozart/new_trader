import React, { Component } from 'react';
import Type from 'prop-types';
import { Link } from 'react-router-dom';
import elbrusImg from './elbrus.png';
import { PAGES } from '../../routes/pages';
import { bemClassNameFactory } from '../../utils/bem';
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
      appName,
      children
    } = this.props;
    return (
      <div className={ cn() }>
        <h1>{ appName }</h1>
        <div className={ cn('header') }>
          <h2>Menu</h2>
          { this.renderMenu() }
        </div>
        { children }
        <div className={ cn('footer') }>
          ---
          <br/>
          Created with Love by Elbrus Team :)
        </div>
      </div>
    );
  }

  renderMenu() {
    return (
      <div className={ cn('menu') }>
        <div className={ cn('menu-logo') }>
          <img alt='Elbrus Image' src={ elbrusImg } height='100px' />
        </div>
        <div className={ cn('menu-list')}>
          <div><Link to={ PAGES.home.path }>Home Page</Link></div>
          <div><Link to={ PAGES.statistic.path }>Statistic</Link></div>
          <div><Link to={ PAGES.page404.path }>Page 404</Link></div>
        </div>
      </div>
    );
  }
}
