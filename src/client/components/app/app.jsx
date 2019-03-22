import React, { Component } from 'react';
import Type from 'prop-types';
import { Link } from 'react-router-dom';
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
      children
    } = this.props;
    return (
      <div className={ cn() }>
        <div className={ cn('header') }>
          { this.renderMenu() }
        </div>
        { children }
        <div className={ cn('footer') }>
        </div>
      </div>
    );
  }

  renderMenu() {
    return (
      <div className={ cn('menu') }>
        <div className={ cn('menu-list')}>
          <div><Link to={ PAGES.home.path }>Traider's Journal</Link></div>
        </div>
      </div>
    );
  }
}
