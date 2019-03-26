import React, { Component } from 'react';
import { PAGES } from '../../routes/pages';

export default class Trades extends Component {
  state = {
    orderInfo: ''
  };

  fetchUser = async () => {
    try {
      const dataFromBase = await fetch(PAGES.API.fetchUser.path);
      this.setState({
        orderInfo: await dataFromBase.json()
      })
    } catch (e) {
      console.error(e);
    }
  };
  componentDidMount() {
    this.fetchUser();
  }

  render() {
    let { orderInfo } = this.state;
    return (
      <div>
        <h2>СДЕЛКИ</h2>
        <div>---------------------</div>
        <div>{JSON.stringify(orderInfo)}</div>
        <div>------------------</div>
      </div>
    );
  }
}
