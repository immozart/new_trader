import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './home-page.css';

export default class HomePage extends Component {
  render() {
    return (
      <div className="jumbotron home-page">
        <h1 className="display-5">Trader's Journal - это бесплатный, гибкий и наглядный способ организовать трейдеру свою торговлю.</h1>
        <p className="lead">Бесконечные заметки на листочках, неудобные громоздкие таблицы с устаревшими сведениями, ворох стикеров и неудобные программы для анализа торговли — все это в прошлом. Просто откройте доску Trader's Journal, чтобы мгновенно увидеть все сведения о проекте. </p>
        <hr className="my-4" />
        <p className="lead">
          <Link className="btn btn-primary btn-lg" to="/login" role="button">Войти</Link>
        </p>
      </div>
    );
  }
}
