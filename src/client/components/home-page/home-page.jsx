import React from 'react';
import { Link } from 'react-router-dom';
import './home-page.css';

const HomePage = () => (
  <div className="jumbotron home-page">
    <h1 className="display-5">Trader's Journal - это бесплатный, гибкий и наглядный способ организовать трейдеру свою
        торговлю.</h1>
    <p className="lead">Бесконечные заметки на листочках, громоздкие таблицы с устаревшими сведениями, ворох
      стикеров и неудобные программы для анализа — все это в прошлом. Просто откройте таблицу Trader's Journal,
        чтобы мгновенно увидеть все сведения о вашей торговле. </p>
    <hr className="my-4" />
    <p className="lead">
      <Link className="btn btn-primary btn-lg" to="/login" role="button">Войти</Link>
    </p>
  </div>
);

export default HomePage;
