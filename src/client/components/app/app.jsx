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
      <div className={cn()}>
        <div className={cn('header')}>
          {this.renderMenu2()}
        </div>
        {children}
        <div className={cn('footer')}>
        </div>
      </div>
    );
  }

  renderMenu() {
    return (
      <div className={cn('menu')}>
        <div className={cn('menu-list')}>
          <div><Link to={PAGES.home.path}>Home Page</Link></div>
          <div><Link to={PAGES.settings.path}>Настройки</Link></div>
          <div><Link to={PAGES.trades.path}>Журнал Сделок</Link></div>
          <div><Link to={PAGES.statistic.path}>Статистика</Link></div>
        </div>
      </div>
    );
  }

  renderMenu2() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to={PAGES.home.path}>Traider's Journal</Link>

        <div className="collapse navbar-collapse" id="navbarColor02">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to={PAGES.login.path}>Вход<span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={PAGES.registration.path}>Регистрация</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={PAGES.settings.path}>Настройки</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={PAGES.trades.path}>Журнал</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={PAGES.statistic.path}>Статистика</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
